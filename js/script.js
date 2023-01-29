class ValidaForm {
  constructor() {
    this.formulario = document.querySelector(".formulario");
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.validaCampos();
    const senhasValidas = this.validaSenhas();

    if (camposValidos && senhasValidas) {
      alert("Formulário enviado!");
      this.formulario.submit();
    }
  }

  validaCampos() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }
    for (let campo of this.formulario.querySelectorAll(".validar")) {
      if (!campo.value) {
        this.criaErro(campo, `Campo "${campo.name}" não pode estar em branco.`);
        valid = false;
      }
      if (campo.classList.contains("cpf")) {
        if (!this.validaCPF(campo)) valid = false;
      }
      if (campo.classList.contains("usuario")) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }
    return true;
  }

  validaCPF(campo) {
    const cpf = new ValidaCpf(campo.value);

    if (!cpf.valida()) {
      this.criaErro(campo, "CPF inválido.");
      return false;
    }
    return true;
  }

  validaUsuario(campo) {
    const usuario = campo.value;
    let valid = true;

    if (!usuario.match(/^[A-Za-z0-9]+$/g)) {
      this.criaErro(campo, "Usuário deverá conter apenas letras e/ou números.");
      valid = false;
    }
    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, "Usuário precisa ter entre 3 e 12 caracteres.");
      valid = false;
    }
    return valid;
  }

  validaSenhas() {
    let valid = true;
    const senha = this.formulario.querySelector(".senha");
    const repetirSenha = this.formulario.querySelector(".repetir-senha");

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, "Senha precisa ter entre 6 e 12 caracteres.");
    }
    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, "Campos senha e repetir senha precisam ser iguais.");
      this.criaErro(
        repetirSenha,
        "Campos senha e repetir senha precisam ser iguais."
      );
    }
    return valid;
  }

  criaErro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    campo.insertAdjacentElement("afterend", div);
  }
}

const form = new ValidaForm();
