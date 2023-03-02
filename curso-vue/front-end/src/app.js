const MyAPP = {
    data() {
        return {
            name: "",
            age: 24,
            input_name: ""
        }
    },
    methods: {
        submitForm(e) {
            e.preventDefault();
            console.log(this.input_name)
            this.name = this.input_name
        }
    }
}



Vue.createApp(MyAPP).mount("#app");