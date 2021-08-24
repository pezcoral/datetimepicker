# datetimepicker Version 2
Add a javascript bootstrap 5 datetimepicker

---------------------------
If you came from Version 1 - Replace the name of the function with the new one and put the parameters passed. 
---------------------------

Version 2 - Only 1 function for all types of calendar
---------------------------
See index.html

---------------------------
Add datepicker
Add datetimepicker
Add timepicker

Add dates range

Custom showing dates
Custom holidays separattedfile

---------------------------
In development auto days count



---------------------------
/**
 * /Funcion para calendarios con fecha - fecha hora o solo hora - 
 * Si es rango solo se necesita inicializar el primero
 * @param {any} dateformat Calendario solamente ver formatos en momentjs Docs - Fecha: DD/MM/YYY - FechaHora: DD/MM/YYY hh:mm:00 - Solo hora: hh:mm:00 /el 00 se puede cambiar por ss para que tome los segundos
 * @param {any} datepicker true si debe aparecer seleccion de fecha
 * @param {any} timepicker true si debe salir seleccion de hora
 * @param {any} input nombre del campo que se va a convertir en date
 * @param {any} mindate fecha minima que puede tener ese calendario - formato yyyy/mm/dd
 * @param {any} maxdate  fecha maxima que puede tener ese calendario - formato yyyy/mm/dd
 * @param {any} rango  false - true -> si no tiene: false o si tiene rango: true
 * @param {any} Finputstart  nombre del campo html inicial del rango
 * @param {any} Finputstart  nombre del campo html final del rango
 * @param {any} saltocuentadias  cantidad de dias en numero enterno que calcula el campo end
 */


frameDTPWidget(input, datepicker = true, timepicker = false, dateformat = "DD/MM/YYYY", mindate = "", maxdate = "", rango = false, Finputstart = "", Finputend = "", saltocuentadias = "")
