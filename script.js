var listafinal=[];//lista aleatoria final
var vagas=[];//lista vagas
var pccselecionados=[];//lista pcd
function main(){
    
    
   
    pccselecionados = selecionarNumeros();//lista pcd
    if(pccselecionados!=-1){
    document.getElementById("selecionar").style.visibility = "hidden";
    listafinal = rand();//lista aleatoria

    listaand();

    var i=0;
    var y=0;

    //relaciona ap com vaga
    for(i=0;i<listafinal.length;i++){
        vagas[i]=i+1;
    }
    for(y=0;y<pccselecionados.length;y++){
        vagas[i]=i+1;
        i++;
    }
    

    var dataHoraAtual = new Date();
    // Obtém a data atual no formato "dd/mm/aaaa"
    var dataAtual = dataHoraAtual.getDate() + '/' + (dataHoraAtual.getMonth() + 1) + '/' + dataHoraAtual.getFullYear();
    // Obtém a hora atual no formato "hh:mm"
    var horaAtual = dataHoraAtual.getHours() + ':' + dataHoraAtual.getMinutes();


    
    var elemento = document.getElementById("data");
    elemento.innerHTML = 'Data: '+dataAtual+' Hora: '+horaAtual;
    
    
    
    // deleta os valores dos pcds da lista final
        for(var i=0; i<pccselecionados.length;i++){
            if (listafinal.includes(pccselecionados[i])){
                listafinal.splice(listafinal.indexOf(pccselecionados[i]),1);
            }
        }
        mostraand(0);
    }

    //xqc(ap,vg);

    //ordena para imprimir
    var lsitatemp=[];
    for(var i=0;i<listafinal.length;i++){
        lsitatemp.push(listafinal[i]);
    }
    for(var i=0;i<pccselecionados.length;i++){
        lsitatemp.push(pccselecionados[i]);
    }
    var vagatemp=[];
    for(var i=0;i<vagas.length;i++){
        vagatemp.push(vagas[i]);
    }
    for (let i = 0; i < lsitatemp.length; i++) {
        for (let j = i + 1; j < lsitatemp.length; j++) {
            if (lsitatemp[i] > lsitatemp[j]) {
                let aux = lsitatemp[i];
                lsitatemp[i] = lsitatemp[j];
                lsitatemp[j] = aux;
                let aux2 = vagatemp[i];
                vagatemp[i] = vagatemp[j];
                vagatemp[j] = aux2;
            }
        }
    }   
    gerarPDF(lsitatemp, vagatemp, dataAtual, horaAtual);

}


//aleatorio pcd
function selecionarNumeros() {
    var input = document.getElementById("vagas").value;
    if(input==''){
        var numeros=-1;
    }
    else{
    numeros = input.split(",").map(function(item) {
    return parseInt(item.trim());
    })};

    //checar se e inteiro
    if(numeros!=-1){
    for (var i = 0; i < numeros.length; i++) {
        if (isNaN(numeros[i])|| temDoisValoresIguais(numeros)) {
            alert("O valor digitado não é um número válido.");
            return -1;
        }
    }
    }

    // selecionados e a var q salva quem selecionou
    var selecionados = [];

    //aleatorio
    while (selecionados.length < 5 && numeros.length > 0) {
        var aleatorio = Math.floor(Math.random() * numeros.length);
        selecionados.push(numeros.splice(aleatorio, 1)[0]);
    }
    return selecionados;
}

function temDoisValoresIguais(array) {
    return new Set(array).size !== array.length;
}

//aleatorio tudo
function rand() {
    var y=152;
    var x=[];
    var aux=0;
    var i=1;
    //cria os apps
    while(aux<y){
        //tira os aps x9 x0
        if((i+1)%10==0){
            i=i+2;
        }
        else{
            x[aux]=i;
            i++;
            aux++;
        }
        
    }

    //randomisa eles
    for(var i=0;i<x.length;i++){
        var rad = Math.floor(Math.random() * x.length);
        var temp = 0;
        var curr = x[i];
        var rando = x[rad];
        temp = curr;
        x[i]= rando;
        x[rad]= temp;
     }
     return x;
    }

//prcura valor
function procurar(){
    if(listafinal[0]!=undefined){
        var i=document.getElementById("pesquisa").value;
        var ind = listafinal.indexOf(parseInt(i));
        if(i==''){
            alert("escreva um apartamento para pesquisar")
        }
        else{
            if(listafinal[ind]==undefined){
                alert("esse apartamento nao existe");
            }
            else{
                alert('Apartamento: '+ listafinal[ind]+' | Vaga: '+vagas[ind]);
            }
        }
    }
    else{
        alert("faca o sorteio primeiro")
    }
}

function listaand(){
    //cria os botoes dos andares
    document.getElementById("andar").innerHTML="";
    let item = document.createElement('button');
        item.innerText = "Todos";
        item.addEventListener("click", function() {
            mostraand(0);
        });
        let idlugar = document.getElementById('andar');
        item.classList.add('and');
        idlugar.appendChild(item);
    for(var i=0;i< listafinal.length/8;i++){
        let item = document.createElement('button');
        let andarNumero = i;
        item.innerText = "Andar: "+(andarNumero);
        item.addEventListener("click", function() {
            mostraand(andarNumero+1);
        });
        item.classList.add('and');
        let idlugar = document.getElementById('andar');
        idlugar.appendChild(item);
    }
}

function mostraand(andar){

    //
    if(andar==0){
        var aux=0;
        document.getElementById("lista").innerHTML="";
        document.getElementById("pcds").innerHTML="";
        imprimepcdinico(pccselecionados);
        //imprime tudo (esta removendo os pcds)
        for(i=0;i<listafinal.length;i++){
            if (aux == 4){
                let item=document.createElement('tr');
                lista.appendChild(item);
                aux=0;
            }
            let item = document.createElement('td');
            let img = document.createElement('img');
            img.src = 'predio.png';
            img.classList.add('selecionado');
            let texto1 = document.createTextNode(' : ' + listafinal[i]);
            let quebraDeLinha = document.createElement('br');
            let img2 = document.createElement('img');
            img2.src = 'carro.png';
            img2.classList.add('selecionado');
            let texto2 = document.createTextNode(' : ' + vagas[i]);
            item.appendChild(img);
            item.appendChild(texto1);
            item.appendChild(quebraDeLinha);
            item.appendChild(img2);
            item.appendChild(texto2);
            lista.appendChild(item);
            aux++;
        }
    }

    //
    else{
        //imprime o andar (ainda ta imprimindo pc normamente)
        document.getElementById("lista").innerHTML="";
        document.getElementById("pcds").innerHTML="";
        var aux2=((andar-1)*10+1)+8;
        var aux=0;
        var auxpcd=0;
        var y=0;
        var pcdand=[];
            for(var i=(andar-1)*10+1;i<aux2;i++){
                
                y = listafinal.indexOf(i);
                if(y==-1){
                    pcdand[auxpcd]=i;
                    auxpcd++;
                }
                else{
                if (aux == 4){
                    let item=document.createElement('tr');
                    lista.appendChild(item);
                    aux=0;
                }
                let item = document.createElement('td');
                let img = document.createElement('img');
                img.src = 'predio.png';
                img.classList.add('selecionado');
                let texto1 = document.createTextNode(' : ' + listafinal[y]);
                let quebraDeLinha = document.createElement('br');
                let img2 = document.createElement('img');
                img2.src = 'carro.png';
                img2.classList.add('selecionado');
                let texto2 = document.createTextNode(' : ' + vagas[y]);
                item.appendChild(img);
                item.appendChild(texto1);
                item.appendChild(quebraDeLinha);
                item.appendChild(img2);
                item.appendChild(texto2);
                lista.appendChild(item);
                aux++;
                y++;
            }
        }
        if(pcdand!=null){
            imprimepcdinico(pcdand);
        }
    }
}

function imprimepcdinico(pcdand){

    for (var i = 0; i < pcdand.length; i++) {
        var newItem = document.createElement('td');
        var img1 = document.createElement('img');
        img1.src = 'prediobrn.png';
        img1.classList.add('pcds');
        var texto1 = document.createTextNode(' : ' + pcdand[i]);
        var quebraDeLinha = document.createElement('br');
        var img2 = document.createElement('img');
        img2.src = 'carropcd.png';
        img2.classList.add('pcds');
        var texto2 = document.createTextNode(' : ' + vagas[listafinal.length + pccselecionados.indexOf(pcdand[i])]);
        newItem.appendChild(img1);
        newItem.appendChild(texto1);
        newItem.appendChild(quebraDeLinha);
        newItem.appendChild(img2);
        newItem.appendChild(texto2);
        document.getElementById('pcds').appendChild(newItem);
    }
}

function gerarPDF(numeros, vaga, data, hora) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // Adiciona um título dentro de uma caixa e o centraliza
    const title = "Tabela de Números Aleatórios";
    const title2 = `Data: ${data} Hora: ${hora}`;
    doc.setFontSize(16);
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title[0], title[1]);
    const titleX = (pageWidth - titleWidth) / 4;
    const titleX2 = (pageWidth - titleWidth) / 1.5;
    doc.rect(10, 10, 190, 10); // Desenha um retângulo para o título
    doc.text(title, titleX, 18);
    doc.setFontSize(12);
    doc.text(title2, titleX2, 18);

    // Adiciona a legenda fora da caixa
    const legendTitle = "Legenda:";
    doc.setFontSize(14);
    doc.text(legendTitle, 12, 36);

    // Adiciona a caixa da legenda
    const legendLine1 = "Apartamentos";
    const legendLine2 = "Vagas";
    doc.setFontSize(12);

    // Define a largura da caixa da legenda com base nos textos
    const maxWidth = Math.max(doc.getTextWidth(legendLine1), doc.getTextWidth(legendLine2)) + 9; // 10 para padding

    // Define a posição inicial do texto da legenda
    const legendX = 35;
    const legendY = 35; // Ajusta para ficar abaixo da linha "Legenda:"
    
    // Ajuste a posição da linha divisória (0.5 = no meio, 0.4 = mais à esquerda, 0.6 = mais à direita)
    const divisorRatio = 1;
    const lineDivisorX = legendX + maxWidth * divisorRatio;

    // Desenha a caixa da legenda
    doc.rect(legendX - 2, legendY - 6, maxWidth * 2, 10); // Multiplica por 2 para acomodar ambos os textos

    // Adiciona os textos da legenda
    doc.text(legendLine1, legendX + 3, legendY);
    doc.text(legendLine2, lineDivisorX + maxWidth / 6, legendY);

    // Adiciona a linha divisória entre os textos da legenda
    doc.line(lineDivisorX, legendY - 6, lineDivisorX, legendY + 4);

    // Configuração das tabelas
    const columnCount = 4; // Ajustando para 4 colunas
    const cellHeight = 6; // Altura da célula para adicionar a caixa
    const cellPadding = 2; // Espaçamento dentro da célula
    const columnSpacing = 5; // Espaçamento entre as colunas

    // Calcular a largura total das caixas com espaçamento
    const tableWidth = (pageWidth - 20 - (columnSpacing * (columnCount - 1))) / columnCount;
    const rowCount = Math.ceil(numeros.length / columnCount);

    let x = 10;
    let y = 66;
    let index = 0;
    doc.setFontSize(16);
    
    for (let col = 0; col < columnCount; col++) {
        y = 66;
        for (let row = 0; row < rowCount; row++) {
            if (index >= numeros.length) break;
            const numero = numeros[index];
            const vagas = vaga[index];
            const texto1 = `${numero}`;
            const texto2 = `${vagas}`;

            doc.rect(x, y - cellHeight + cellPadding, tableWidth, cellHeight); // Desenha a caixa em torno do número
            doc.text(texto1, x + cellPadding, y - (cellHeight / 2) + (cellPadding * 2));
            // Para posicionar o texto2 do outro lado da barra vertical, ajuste a coordenada x
            doc.text(texto2, x + (tableWidth / 2) + cellPadding, y - (cellHeight / 2) + (cellPadding * 2));
            doc.line(x + (tableWidth / 2), y - cellHeight + cellPadding, x + (tableWidth / 2), y + cellPadding); // Desenha a barra vertical
            y += cellHeight; // Mantém a altura das linhas sem espaçamento adicional
            index++;
        }
        x += tableWidth + columnSpacing; // Adiciona o espaçamento entre as colunas
    }
    doc.save('Sorteio.pdf');
}

function xqc(ap,vg){
   var vgidx = vagas.indexOf(vg);
   var apind = listafinal.indexOf(ap);
   var aux = listafinal[vgidx];
   listafinal[vgidx]=listafinal[apind];
   listafinal[apind]=aux;
}