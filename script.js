window.client = io.connect('http://localhost:8080');
var chat={}
var main =function(){
	client.on('inicio', function (data) {
		var sala = JSON.parse(data.sala);
		$.each(sala, function(index, value){
			mensajeTodos(value.msg, value.c, value.s, value.n);	
		});
		
	});
	client.on('nuevoMensaje', function (data) {
		mensajeTodos(data.msg, data.c, data.s, data.n);
	});
	if(localStorage.usuario){
		$('#nombre').val(localStorage.usuario);
	}
	if(localStorage.colores){
		$('#color').val(localStorage.colores);
	}
	if(localStorage.tamano){
		$('#size').val(localStorage.tamano);
	}
}
var enviarMensaje=function(){
	var mensaje=$('#mensaje').val();
	$('#mensaje').val('');
	var nombre=$('#nombre').val();
	var color=$('#color').val();
	var size=$('#size').val();
	var box = $('<div id="boxMsg"></div>');
	box.css('color', color).css('font-size', size);
	box.append('<STRONG>'+nombre+':</STRONG> ');
	box.append(mensaje);
	$('#lista').prepend(box);
	window.client.emit('nuevoMensaje',{
                    msg : mensaje,
                    c : color,
                    s : size,
                    n : nombre
                });
}
var guardarColor=function(){
	localStorage.colores=$(this).val();
}
var guardarTamano=function(){
	localStorage.tamano=$(this).val();
}
var guardarUsuario=function(){
	localStorage.usuario=$(this).val();
}
var mensajeTodos=function(mensaje, color, size, nombre){
	var box = $('<div id="boxMsg"></div>');
	box.css('color', color).css('font-size', size);
	box.append('<STRONG>'+nombre+':</STRONG> ');
	box.append(mensaje);
	$('#lista').prepend(box);
}
var menuDesplegable=function(){
	var aparecer={
		display:'inline-block',
		opacity:"1",
		height:'200px',
	}
	var desvanecer={
		display:'none',
		opacity:"0",
		height:'0px',
	}
	if($('#option').css('opacity')=='0'){
		$('#option').css(aparecer);
	}else{
		$('#option').css(desvanecer);
	}
	return false;
}
$(document).on('ready', main);
$('#botonOpciones').on('click', menuDesplegable);
$('#enviar').on('click', enviarMensaje);
//Enviar mensaje al presionar enter.
$('#mensaje').on('change', enviarMensaje);
$('#color').on('change', guardarColor);
$('#size').on('change', guardarTamano);
$('#nombre').on('change', guardarUsuario);
//Arregla el bug de responsive desing
$(window).resize(function(){
	var bodyWidth = $(this).width();
	if(bodyWidth>450 && $('#option').attr('style')!=''){
		$('#option').removeAttr("style");
	}
});
