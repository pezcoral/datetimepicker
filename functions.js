/*TIMEPICKERS WIDGET*/
$(document).ready(function () {
    /*Evitar fallo con momentjs - obligatorio*/
    $.datetimepicker.setDateFormatter({
        parseDate: function (date, format) {
            var d = moment(date, format);
            return d.isValid() ? d.toDate() : false;
        },
        formatDate: function (date, format) {
            return moment(date).format(format);
        },
        formatMask: function (format) {
            return format
                .replace(/Y{4}/g, '9999')
                .replace(/Y{2}/g, '99')
                .replace(/M{2}/g, '19')
                .replace(/D{2}/g, '39')
                .replace(/H{2}/g, '29')
                .replace(/m{2}/g, '59')
                .replace(/s{2}/g, '59');
        }
    });
    /*Set language*/
    jQuery.datetimepicker.setLocale('es');
});

/*Arreglos con variables fijas para los tipos de widgetpicker - arreglo de fechas FW_fechasDTPCwidget esta en su propio archivo js: fechasDTPCwidget.js*/
var FW_monthsDTPCwidget = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var FW_dofwekDTPCwidget = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

/**
 * Para validar si existe fecha minima en este campo
 * @param {any} vdateorigin trae 1 si es hoy o -1 para ayer  | formato de recibo yyyy/mm/dd 
 */
function validateMinDateDTPW(vdateorigin) {
    if (vdateorigin == "") {
        /*Restarle 30 años por defecto a la fecha actual*/
        vdateorigin = new Date();
        vdateorigin = new Date((vdateorigin.getFullYear() - 10), (parseInt(vdateorigin.getMonth()) - 1), vdateorigin.getDate());
    } else if (vdateorigin == "born") {
        /*Restarle 150 años por defecto a la fecha actual cuando es fechas de nacimiento*/
        vdateorigin = new Date();
        vdateorigin = new Date((vdateorigin.getFullYear() - 150), (parseInt(vdateorigin.getMonth()) - 1), vdateorigin.getDate());
    }
    else if (vdateorigin == "1") { vdateorigin = "0"; }
    else if (vdateorigin == "-1") { vdateorigin = "-1970/01/02"; }
    else if (vdateorigin != "") {
        vdateorigin = new Date(vdateorigin);
        vdateorigin = new Date(vdateorigin.getFullYear(), (parseInt(vdateorigin.getMonth())), vdateorigin.getDate());
    }
    return vdateorigin;
}

/**
 * Para validar si existe fecha maxima en este campo
 * @param {any} vdateorigin trae 1 si es hoy o -1 para ayer   | formato de recibo yyyy/mm/dd
 */
function validateMaxDateDTPW(vdateorigin) {
    if (vdateorigin == "") {
        /*Añadirle 30 años por defecto a la fecha actual*/
        vdateorigin = new Date();
        vdateorigin = new Date((vdateorigin.getFullYear() + 10), (parseInt(vdateorigin.getMonth()) - 1), vdateorigin.getDate());
    }
    else if ( (vdateorigin == "1") || (vdateorigin == "born") ) { vdateorigin = "0"; }
    else if (vdateorigin == "-1") { vdateorigin = "+1970/01/02"; }
    else if (vdateorigin != "") {
        vdateorigin = new Date(vdateorigin);
        vdateorigin = new Date(vdateorigin.getFullYear(), (parseInt(vdateorigin.getMonth())), vdateorigin.getDate());
    }
    return vdateorigin;
}
/**
 * Para asignar fecha de inicio del calendario   | formato de recibo yyyy/mm/dd
 * @param {any} vdateorigin 
 */
function validateStartDateDTPW(vdateorigin) {
    if (vdateorigin == "") {
        /*Restarle 10 años por defecto a la fecha actual*/
        vdateorigin = new Date();
        vdateorigin = (vdateorigin.getFullYear() - 10);
    }
    else if (vdateorigin == "born") {
        /*Restarle 10 años por defecto a la fecha actual*/
        vdateorigin = new Date();
        vdateorigin = (vdateorigin.getFullYear() - 150);
    }
    else if (vdateorigin != "") {
        vdateorigin = new Date(vdateorigin);
        vdateorigin = vdateorigin.getFullYear();
    }
    return vdateorigin;
}
/**
 * Para asignar fecha de inicio del calendario 
 * @param {any} vdateorigin trae 2 es mañana  | formato de recibo yyyy/mm/dd
 */
function validateEndDateDTPW(vdateorigin) {
    if (vdateorigin == "") {
        /*Restarle 10 años por defecto a la fecha actual*/
        vdateorigin = new Date();
        vdateorigin = (vdateorigin.getFullYear() + 10);
    }
    else if (vdateorigin == "born") {
        /*Restarle 10 años por defecto a la fecha actual*/
        vdateorigin = new Date();
        vdateorigin = vdateorigin.getFullYear();
    }
    else if (vdateorigin != "") {
        vdateorigin = new Date(vdateorigin);
        vdateorigin = vdateorigin.getFullYear();
    }
    return vdateorigin;
}


$(document).ready(function () {
    frameDTPWidget("iniciotest", true, false, "DD/MM/YYYY", "", "", true, "iniciotest", "fintest", saltocuentadias = "10")
});

/*Para ajustar la fecha al formato de devolucion al input final*/
function changedate(fechatotal, dateformat) {

    var diaconvert = parseInt(fechatotal.getDate());
    var mesconvert = parseInt(fechatotal.getMonth() + 1);
    if (diaconvert < 10) { diaconvert = "0" + diaconvert; }
    if (mesconvert < 10) { mesconvert = "0" + mesconvert; }

    var fechatotalINDEX = ""
    /*Formato e dia mes año completo*/
    if (dateformat == "DD/MM/YYYY") {
        fechatotalINDEX = diaconvert + "/" + mesconvert + "/" + fechatotal.getFullYear();
    }
    /*faltan agregar otros formatos*/

    /*Retorna con el formato final para el registro*/
    return fechatotalINDEX;
}


/*Funcion que cuenta dias quitando dias habiles segun lista de datepicker para asignar el dia final segun saltocuentadias*/
function cuentadiasDTPW(Finputstart, Finputend, saltocuentadias, dateformat) {
    /*Ejecutar solo si se ha ingresado una fecha de incio*/
    var VFinputstart = document.getElementById(Finputstart).value;
    if (VFinputstart != "") {
        var fechatotal = ""
        /*Crear todos los tipos de formatos que pueden pasarse, por ahora solo esta este*/
        if (dateformat == "DD/MM/YYYY") {
            /*La fecha debe estar separada por año, mes, dia*/
            VFinputstart = VFinputstart.split("/")
            /*Asignar la fecha correcta*/
            fechatotal = new Date(VFinputstart[2], (VFinputstart[1]-1), VFinputstart[0]);
        }

        var fechasexcluidas = "";

        /*Recorrer la cantidad de dias de saltocuentadias para ir validadno si es sabado domingo o festivo*/
        for (i = 1; i <= saltocuentadias; i++) {
            /*Le suma un dia*/
            fechatotal.setDate(fechatotal.getDate() + 1);
            /*Tomar el numero del dia para validarlo 6=sabado 7=domingo*/
            numdia = (parseInt(fechatotal.getDay()));

            if (numdia == 6) {
                /*Valida si ese dia es sabado o domingo y restarle 1 al ciclo for porque no cuenta*/
                i = i - 1;
                /*Ajustar mensaje de notificacion fechas*/
                if (fechasexcluidas != "") { fechasexcluidas = fechasexcluidas + "<br>"; }
                fechasexcluidas = fechasexcluidas + changedate(fechatotal, dateformat) + " es sábado";
            }else if (numdia == 0) {
                /*Valida si ese dia es sabado o domingo y restarle 1 al ciclo for porque no cuenta*/
                i = i - 1;
                /*Ajustar mensaje de notificacion fechas*/
                if (fechasexcluidas != "") { fechasexcluidas = fechasexcluidas + "<br>"; }
                fechasexcluidas = fechasexcluidas + changedate(fechatotal, dateformat) + " es domingo";
            } else {
                /*Validar si ese dia de semana L-V está entre los dias festivos segun el calendario de dias festivos*/
                var fechatotalINDEX = changedate(fechatotal, dateformat)
                /*Valida si existe el valor dentro del arreglo de datos de fechas festivos o feriados*/
                if (FW_fechasDTPCwidget.indexOf(fechatotalINDEX) != -1) {
                    i = i - 1;
                    /*Ajustar mensaje de notificacion fechas*/
                    if (fechasexcluidas != "") { fechasexcluidas = fechasexcluidas + "<br>"; }
                    fechasexcluidas = fechasexcluidas + changedate(fechatotal, dateformat) + " es festivo";
                }
            }
        }

        /*Asignar fecha final a input final*/
        document.getElementById(Finputend).value = changedate(fechatotal, dateformat);

        /*Mostrar notificacion informando los dias festivos que se tomaron y fines de semana*/
        if (fechasexcluidas != "") {
            setTimeout(function () { toastgendefault("Días excluidos", fechasexcluidas); }, 1000);
        }
    }
}

/**
 * Para crear el frame del widget
 * Funcion para calendarios con fecha - fecha hora o solo hora - 
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
function frameDTPWidget(input, datepicker = true, timepicker = false, dateformat = "DD/MM/YYYY", mindate = "", maxdate = "", rango = false, Finputstart = "", Finputend = "", saltocuentadias = "") {

    yearstart = validateStartDateDTPW(mindate)
    yearend = validateEndDateDTPW(maxdate)
    mindate = validateMinDateDTPW(mindate)
    maxdate = validateMaxDateDTPW(maxdate)

    /*Si hay rango ejecutar*/
    if (rango == true) {
        jQuery(function () {
            jQuery('#' + Finputstart).datetimepicker({
                format: dateformat,
                formatTime: 'h:mm a',
                formatDate: 'DD/MM/YYYY',
                i18n: {
                    es: {
                        months: FW_monthsDTPCwidget,
                        dayOfWeek: FW_dofwekDTPCwidget
                    }
                },
                onShow: function (ct) {
                    this.setOptions({
                        maxDate: jQuery('#' + Finputend).val() ? jQuery('#' + Finputend).val() : false
                    })
                },
                datepicker: datepicker,
                timepicker: timepicker,
                minDate: mindate,
                maxDate: maxdate,
                yearStart: yearstart,
                yearEnd: yearend,
                step: 15,
                disabledWeekDays: [0, 6],
                disabledDates: FW_fechasDTPCwidget
            });
            jQuery('#' + Finputend).datetimepicker({
                format: dateformat,
                formatTime: 'h:mm a',
                formatDate: 'DD/MM/YYYY',
                i18n: {
                    es: {
                        months: FW_monthsDTPCwidget,
                        dayOfWeek: FW_dofwekDTPCwidget
                    }
                },
                onShow: function (ct) {
                    this.setOptions({
                        minDate: jQuery('#' + Finputstart).val() ? jQuery('#' + Finputstart).val() : false
                    })
                },
                datepicker: datepicker,
                timepicker: timepicker,
                minDate: mindate,
                maxDate: maxdate,
                yearStart: yearstart,
                yearEnd: yearend,
                step: 15,
                disabledWeekDays: [0, 6],
                disabledDates: FW_fechasDTPCwidget
            });
        });
    } else {
        /*Init datepicker - solo fecha - normal*/
        jQuery('#' + input).datetimepicker({
            format: dateformat,
            formatTime: 'h:mm a',
            formatDate: 'DD/MM/YYYY',
            i18n: {
                es: {
                    months: FW_monthsDTPCwidget,
                    dayOfWeek: FW_dofwekDTPCwidget
                }
            },
            datepicker: datepicker,
            timepicker: timepicker,
            minDate: mindate,
            maxDate: maxdate,
            yearStart: yearstart,
            yearEnd: yearend,
            step: 15,
            disabledWeekDays: [0, 6],
            disabledDates: FW_fechasDTPCwidget            
        });
    }

    /*Crea accion onchange en el input start frente al input finish - Si el valor tiene la cantidad de dias a saltar, entonces crear en el DOM accion onchange de start frente a end*/
    if (saltocuentadias != "") {
        document.getElementById(Finputstart).setAttribute('onblur', 'cuentadiasDTPW(\'' + Finputstart + '\',\'' + Finputend + '\',\'' + saltocuentadias + '\',\'' + dateformat + '\' )');
    }
}
