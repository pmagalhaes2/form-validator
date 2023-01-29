class ValidaCpf {
  constructor(cpf) {
    this.cpf = cpf.replace(/\D/g, "");
  }

  valida() {
    if (typeof this.cpf === "undefined") return false;
    if (this.cpf.length !== 11) return false;

    const cpfParcial = this.cpf.slice(0, -2);
    const primeiroDigito = this.geraDigito(cpfParcial, 10);
    const segundoDigito = this.geraDigito(cpfParcial + primeiroDigito, 11);
    const cpfVerificado = cpfParcial + primeiroDigito + segundoDigito;

    return cpfVerificado === this.cpf;
  }

  geraDigito(cpfParcial, cont) {
    let i = cont;
    let soma = 0;
    for (let num of cpfParcial) {
      soma += num * i;
      i--;
    }
    const digito = 11 - (soma % 11);
    return digito > 9 ? "0" : String(digito);
  }
}
