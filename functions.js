
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

/*Funcion para calendarios con fecha unicamente*/
function datepickerwidget(input) {
    /*Init datepicker - solo fecha*/
    jQuery('#' + input).datetimepicker({
        format: 'DD/MM/YYYY',
        formatTime: 'hh:mm:ss',
        formatDate: 'DD/MM/YYYY',
        i18n: {
            es: {
                months: FW_monthsDTPCwidget,
                dayOfWeek: FW_dofwekDTPCwidget 
            }
        },
        timepicker: false,
        disabledWeekDays: [0, 6],
        disabledDates: FW_fechasDTPCwidget
    });
}

/*Funcion para calendarios con fecha y hora*/
function datetimepickerwidget(input) {
    /*Init datepicker - solo fecha*/
    jQuery('#' + input).datetimepicker({
        format: 'DD/MM/YYYY hh:mm:00',
        formatTime: 'h:mm a',
        formatDate: 'DD/MM/YYYY',
        i18n: {
            es: {
                months: FW_monthsDTPCwidget,
                dayOfWeek: FW_dofwekDTPCwidget
            }
        },
        step: 15,
        disabledWeekDays: [0, 6],
        disabledDates: FW_fechasDTPCwidget
    });
}

/*Funcion para calendarios con fecha unicamente*/
function timepickerwidget(input) {
    /*Init datepicker - solo fecha*/
    jQuery('#' + input).datetimepicker({
        format: 'hh:mm:00',
        formatTime: 'h:mm: a',
        formatDate: 'DD/MM/YYYY',
        i18n: {
            es: {
                months: FW_monthsDTPCwidget,
                dayOfWeek: FW_dofwekDTPCwidget
            }
        },
        datepicker: false,
        step: 15
    });
}
