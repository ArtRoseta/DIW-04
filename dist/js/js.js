//Javascript

var counter = 0;
var counterMain = 0;

if(document.getElementById('title-main')){
  document.getElementById('title-main').addEventListener("mouseover", function(){
    var wordsMain = ['Module Bundlers', "Curso 2020-2021, Diseño de Aplicaciones Web"];
    var wordWrapperMain = document.getElementById('word-main');
    if(counterMain == 0){
      efecto_maquina_de_escribir(wordsMain, wordWrapperMain);
    }
    counterMain++;
  });
}else if(document.getElementById('title')){
  document.getElementById('title').addEventListener("mouseover", function(){
    var wordsFront = ['Lenguajes Front-End', 'Aprende con nosotros todo sobre Front-End', "Curso 2020-2021, Diseño de Aplicaciones Web"];
    var wordWrapperFront = document.getElementById('word');
    if(counter == 0){
      efecto_maquina_de_escribir(wordsFront, wordWrapperFront);
    }
    counter++;
  });
}



function efecto_maquina_de_escribir(wordsMF, wordWrapperMF){

  var words = wordsMF;
  var wordWrapper = wordWrapperMF;
  var wordWrapperContent = wordWrapper.innerHTML;
  var addingWord = false;
  var counter = 1;
  wordWrapper.style.opacity = 1;
  setInterval(function(){

    if(wordWrapperContent.length > 0 && !addingWord ) {
      wordWrapper.innerHTML = wordWrapperContent.slice(0, -1);
      wordWrapperContent = wordWrapper.innerHTML;
    } else {
      addingWord = true;
    }

    if( addingWord ){
      if( wordWrapperContent.length < words[counter].length  ) {
        wordWrapper.innerHTML = words[counter].slice(0, wordWrapperContent.length + 1);
        wordWrapperContent = wordWrapper.innerHTML;
      } else {
        if( counter < words.length) {
          counter ++
        }
        addingWord = false;
      }
    }

    if( counter == words.length) {
      counter = 0;
    }

  }, 100);

}

//Svg cuadrado
var svg_cuadrado = document.getElementById('svg-cuadrado').addEventListener("click", function(){
  window.open("https://openwebinars.net/");
});
