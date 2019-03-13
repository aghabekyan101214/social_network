<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Register form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field prepend-icon="person" @input="deleteApis('name')" :rules="nameRules" :counter="50" v-model="name"
                                                  label="Name" type="text" required></v-text-field>
                                    <v-text-field prepend-icon="person" @input="deleteApis('surname')" :rules="surnameRules" :counter="50"
                                                  v-model="surname" label="Surname" type="text" required></v-text-field>
                                    <v-text-field prepend-icon="email" @input="deleteApis('email')" v-model="email" :rules="emailRules" label="Email"
                                                  type="text" required></v-text-field>
                                    <v-text-field prepend-icon="lock" @input="deleteApis('pass')" v-model="pass" :rules="passwordRules"
                                                  label="Password" type="password" required></v-text-field>
                                    <v-text-field prepend-icon="lock" v-model="passwordConf" :rules="passwordConfRules"
                                                  label="Password Confirmation" type="password" required></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="sendForm">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        data() {
            return {
                drawer: null,
                valid: false,
                name: "",
                surname: "",
                email: "",
                pass: "",
                passwordConf: "",
                api: {
                    nameApi: false,
                    surnameApi: false,
                    emailApi: false,
                    passApi: false,
                },
                nameRules: [
                    v => !!v || 'Name is required',
                    v => v.length <= 50 || 'Name must be less than 50 characters',
                    v => this.api.nameApi == false || this.api.nameApi,
                ],
                surnameRules: [
                    v => !!v || 'Surname is required',
                    v => v.length <= 50 || 'Surname must be less than 50 characters',
                    v => this.api.surnameApi == false || this.api.surnameApi,
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                    v => this.api.emailApi == false || this.api.emailApi,
                ],
                passwordRules: [
                    v => !!v || 'Password is Required',
                    v => (v && v.length >= 6) || 'Password Length Should Be Min 6 Symbols',
                    v => this.api.passApi == false || this.api.passApi,
                ],
                passwordConfRules: [
                    v => !!v || 'Password Confirmation is Required',
                    v => v === this.pass || 'Passwords Don`t Match',
                ]
            }
        },
        methods: {
            sendForm() {
                let url = this.$store.state.baseUrl;
                this.$http.post(url + '/register', {
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    pass: this.pass,
                    passwordConf: this.passwordConf,
                }).then((res) => {
                    let data = res.data;
                    if(data == 1) {
                        this.$router.push('/login');
                        return;
                    }
                    data.forEach((r) => {
                        let msg = r.param + 'Api';
                        let self = this;
                        self.api[msg] = r.msg;
                    });
                    this.$refs.form.validate();
                })
            },
            deleteApis(e) {
                let self = this;
                e = e + "Api";
                self.api[e] = false;
            }
        },

    }
</script>
<style scoped>

</style>