
	// Quando o input perde o foco, vamos tentar passar o seu valor para float. Se nao conseguirmos,
	// colocaremos uma borda vermelha nesse input para indicar que esse valor nao e permitido

function handleOnBlur(id){
	let textField = document.getElementById(id);
	if(textField.value.indexOf(",") >= 0){
		textField.value = textField.value.replace(",",".");	
	}
	
	if(isNaN(parseFloat(textField.value)) && !textField.value == ""){
		textField.style.borderColor = "red";
	}
}

	// Quando o input ganha o foco, vamos retomar a sua borda para a cor padrao.

function handleOnFocus(id){
	let textField = document.getElementById(id);
	let borda = document.getElementById("nomeField").style.borderColor;
	textField.style.borderColor = borda;
}

	// Para que os dados sejam validos, ao menos um campo de cada aba (receita e gastos) deve ser preenchido
	// Se naquela aba nao houver nenhum campo preenchido vamos exibir um erro.

	// Se todos os valores que nao estiverem vazios forem validos, vamos instanciar um objeto da classe receita e
	// um objeto da classe gastos, calcularemos o total da receita, e o total gasto
	// Colocaremos nos campos Total Receita e Total Gasto respectivamente e a diferenca colocaremos no campo liquido

function processar(){

	let nomeField = document.getElementById("nomeField");
	let receitaField = document.getElementById("receitaField");
	let gastosField = document.getElementById("gastosField");
	let liquidoField = document.getElementById("liquidoField");

	let salarioField = document.getElementById("salarioField");
	let vendasField = document.getElementById("vendasField");
	let alugueisField = document.getElementById("alugueisField");
	let outrosReceitaField = document.getElementById("outrosReceitaField");

	let alimentacaoField = document.getElementById("alimentacaoField");
	let moradiaField = document.getElementById("moradiaField");
	let transporteField = document.getElementById("transporteField");
	let saudeField = document.getElementById("saudeField");
	let educacaoField = document.getElementById("educacaoField");
	let outrosGastosField = document.getElementById("outrosGastosField");

	let resumoRadio = document.getElementById("resumoRadio");
	let receitaRadio = document.getElementById("receitaRadio");
	let gastosRadio = document.getElementById("gastosRadio");


	if(salarioField.value.trim() === "" && vendasField.value.trim() === "" && alugueisField.value.trim() === "" 
			&& outrosReceitaField.value.trim() === ""){
		receitaRadio.checked = true;
		alert("Preencha todos os campos!");
		return;
	}
	if(alimentacaoField.value.trim() === "" && moradiaField.value.trim() === "" && transporteField.value.trim() === "" 
			&& saudeField.value.trim() === "" && educacaoField.value.trim() === "" && outrosGastosField.value.trim() === ""){
		gastosRadio.checked = true;
		alert("Preencha todos os campos!");
		return;
	}

	let salario = 0;
	let vendas = 0;
	let alugueis = 0;
	let outrosReceita = 0;

	if(salarioField.value !== ""){
		salario = parseFloat(salarioField.value.trim());	
	}

	if(vendasField.value !== ""){
		vendas = parseFloat(vendasField.value.trim());	
	}
	
	if(alugueisField.value !== ""){
		alugueis = parseFloat(alugueisField.value.trim());	
	}
	
	if(outrosReceitaField.value !== ""){
		outrosReceita = parseFloat(outrosReceitaField.value.trim());	
	}	

	if(isNaN(salario) || isNaN(vendas) || isNaN(alugueis) || isNaN(outrosReceita)){
		receitaRadio.checked = true;
		alert("Valor Inválido");
		return;
	}

	let alimentacao = 0;
	let moradia = 0;
	let transporte = 0;
	let saude = 0;
	let educacao = 0;
	let outrosGastos = 0;


	if(alimentacaoField.value !== ""){
		alimentacao = parseFloat(alimentacaoField.value.trim());
	}
	if(moradiaField.value !== ""){
		moradia = parseFloat(moradiaField.value.trim());	
	}
	
	if(transporteField.value !== ""){
		transporte = parseFloat(transporteField.value.trim());	
	}
	
	if(saudeField.value !== ""){
		saude = parseFloat(saudeField.value.trim());	
	}
	
	if(educacaoField.value !== ""){
		educacao = parseFloat(educacaoField.value.trim());	
	}
	
	if(outrosGastosField.value !== ""){
		outrosGastos = parseFloat(outrosGastosField.value.trim());	
	}
	

	if(isNaN(alimentacao) || isNaN(moradia) || isNaN(transporte) || isNaN(saude) || isNaN(educacao) 
		|| isNaN(outrosGastos)){
		gastosRadio.checked = true;
		alert("Valor Inválido");
		return;
	}

	let receita = new Receita(salario,vendas,alugueis,outrosReceita);
	let gastos = new Gastos(alimentacao,moradia,transporte,saude,educacao,outrosGastos);

	let receitaTotal = receita.calcularReceitaTotal();
	receitaTotal = parseFloat(receitaTotal.toFixed(2));

	let gastoTotal = gastos.calcularGastoTotal();
	gastoTotal = parseFloat(gastoTotal.toFixed(2));

	let liquido = receitaTotal - gastoTotal;
	liquido = parseFloat(liquido.toFixed(2));

	receitaField.value = `R$${receitaTotal}`;
	gastosField.value = `R$${gastoTotal}`;
	liquidoField.value = `R$${liquido}`;

	receitaField.value = receitaField.value.replace(".",",");
	gastosField.value = gastosField.value.replace(".",",");
	liquidoField.value = liquidoField.value.replace(".",",");

	resumoRadio.checked = true;

}

	// Acionar o botao quando o enter for pressionado

function handleKeyPress(event){
	var key = (event.keyCode ? event.keyCode : event.which);
	if (key == 13) {
		processar();
	}
}

	// Inicio da Classe Receita


class Receita{
	constructor(salario,vendas,alugueis,outros){
		this._salario = salario;
		this._vendas = vendas;
		this._alugueis = alugueis;
		this._outros = outros;
	}

	calcularReceitaTotal(){
		return this._salario + this._vendas + this._alugueis + this._outros;
	}
}

	// Inicio da Classe Gastos

class Gastos{
	constructor(alimentacao,moradia,transporte,saude,educacao,outros){
		this._alimentacao = alimentacao;
		this._moradia = moradia;
		this._transporte = transporte;
		this._saude = saude;
		this._educacao = educacao;
		this._outros = outros;
	}

	calcularGastoTotal(){
		return this._alimentacao + this._moradia + this._transporte + this._saude + this._educacao + this._outros;
	}
}