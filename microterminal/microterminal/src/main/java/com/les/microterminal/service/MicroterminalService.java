package com.les.microterminal.service;

import java.io.*;
import java.net.*;

public class MicroterminalService {

    private int port = 8080;
    private Socket socket = null;
    private ServerSocket serverSocket = null;
    private BufferedInputStream bis = null;
    private DataInputStream dis = null;
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

            OutputStreamWriter dos = new OutputStreamWriter (socket.getOutputStream(), "utf-8");

            dos.flush();
            dos.write("teste");
            //dos.close();


            while (true) {
                try {
                    BufferedReader in =                                          
                            new BufferedReader(
                                    new InputStreamReader(socket.getInputStream()));
                    dos.flush();
                    var tecla = in.read() - 48;
                    processKey(tecla, dos);
                    
                    if(!searchProduct) {
                        dos.flush();
                        //dos.write("insira seu CPF " + barCode);
                    }

                    System.out.println(barCode);
                } catch (IOException e) {
                    e.printStackTrace();
                    dos.close();
                    break;
                }
            }
            dis.close();
            socket.close();
            dos.close();
            System.out.println("Client " + socket.getRemoteSocketAddress() + " disconnect from server...");
        } catch (IOException e) {
            System.out.println("Error " + e);
        }
    }

    private void processKey(int key, OutputStreamWriter dos) throws IOException{
        //dos.write("#27'[H' #27'[2J'");
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

    private void getProductByBarCode(String barcode, OutputStreamWriter dos) throws IOException {
        var urlBarCode = new URL("http://localhost:3001/consumption/pagar/" + barcode);
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
            //dos.write(content.toString());
        }
        catch (Exception e) {
            dos.flush();
            //dos.write("Erro ao buscar cliente!");
        }
    }

    public static void main(String args[]) {
       MicroterminalService server = new MicroterminalService();
    }
}

