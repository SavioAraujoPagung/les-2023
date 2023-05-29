package com.les.microterminal.service;
//import com.fasterxml.jackson.core.json.JsonReadContext;
//import org.apache.tomcat.util.json.JSONParser;

import java.io.*;
import java.net.*;

public class MicroterminalService {

    private int port = 1025;
    private Socket socket = null;
    private ServerSocket serverSocket = null;
    private BufferedInputStream bis = null;
    private DataInputStream dis = null;
    //private static final String message = "Insira o codigo de barras do produto: ";
    private String barCode = "";
    private Boolean searchProduct = false;

    public MicroterminalService() {
        try {
            serverSocket = new ServerSocket(port);
            System.out.println("Server started on port " + serverSocket.getLocalPort() + "...");
            System.out.println("Waiting for client...");

            socket = serverSocket.accept();
            System.out.println("Client " + socket.getRemoteSocketAddress() + " connected to server...");

            bis = new BufferedInputStream(socket.getInputStream());
            dis = new DataInputStream(bis);

            while (true) {
                try {
                    DataOutputStream dos = new DataOutputStream(socket.getOutputStream());
                    BufferedReader in =                                          // 3rd statement
                            new BufferedReader(
                                    new InputStreamReader(socket.getInputStream()));
//                    dos.flush();
//                    dos.writeBytes("#27'[H'");
                    var tecla = in.read() - 48;
                    processKey(tecla, dos);
                    if(!searchProduct) {
                        dos.writeBytes("\u001b[2J");
                        dos.writeBytes("\u001b[H");
                        dos.writeBytes("CPF: " + barCode);
                    }

                    System.out.println(barCode);
                } catch (IOException e) {
                    e.printStackTrace();
                    break;
                }
            }
            dis.close();
            socket.close();
            System.out.println("Client " + socket.getRemoteSocketAddress() + " disconnect from server...");
        } catch (IOException e) {
            System.out.println("Error : " + e);
        }
    }

    private void processKey(int key, DataOutputStream dos) throws IOException{
        dos.writeBytes("#27'[H' #27'[2J'");
//        #27'[H'#27'[J'
//        print(chr(27) + "[2J")
        switch (key) {
            case -2:  // Tecla .
            case 40:  // Tecla X
                break;
            case -35:  // Tecla ENTER
                if(searchProduct) {
                    searchProduct = false;
                    barCode = "";
                    break;
                }
                getProductByBarCode(barCode, dos);
                break;
            case -40:  // Tecla BACKSPACE
                if(barCode.length() == 0) {
                    break;
                }
                barCode = barCode.substring(0, barCode.length() - 1);
                break;
            case -21:  // Tecla DELETE
                barCode = "";
                break;
            default:
                if(barCode.length() < 14) {
                    barCode = barCode.concat(String.valueOf(key));
                }
        }
    }

    private void getProductByBarCode(String cpf, DataOutputStream dos) throws IOException {
        var urlBarCode = new URL("http://localhost:3001/consumption/microterminal/" + cpf);
        HttpURLConnection con = (HttpURLConnection) urlBarCode.openConnection();
        con.setRequestMethod("GET");
        con.setDoOutput(true);
        searchProduct = true;
        try{
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
            dos.flush();
            dos.writeBytes("\u001b[2J");
            dos.writeBytes("\u001b[H");
            dos.writeBytes("R$"+content.toString());
        }
        catch (Exception e) {
            dos.flush();
            dos.writeBytes("\u001b[2J");
            dos.writeBytes("\u001b[H");
            dos.writeBytes("Cliente nao         encontrado com esse CPF.                Tente novamente!");
        }
    }

    public static void main(String args[]) {
       MicroterminalService server = new MicroterminalService();
    }
}

