/*------------------------------------------------------------------------------------------------------------------------------------*/
/* marca temporal --------------*/ const update = Utilities.formatDate(new Date(), "GMT-3", "dd MMM HH:mm");Logger.log(update)
/* fecha de update -------------*/ const dteLABS = Utilities.formatDate(new Date(), "GMT-3", "yyyy-MM-dd");Logger.log(dteLABS)
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* ID INF-ASSIST-LABS_ARBUE_06 ---*/ const idInfLabs = "1Id66J66QsQr33C1Aba0iyzv3_AL_nIwIVfZJUg8982g"
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Conexion Libro activo -------*/ const sp = SpreadsheetApp.getActiveSpreadsheet();    
/* Conexion Hoja "LABS" ----------*/ const ss = sp.getSheetByName('LABS');
/* Conexion hoja UPDATE-LABS -----*/ const ssUpdateLabs = sp.getSheetByName('UPDATE-LABS');
/* Conec hoja PLANILLA-EMAIL ---*/ const ssPlantilla = sp.getSheetByName('PLANTILLA-EMAIL');
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Cantidad de columnas de LABS --*/ const columnas = 72;
/* Cant de estudiantes ---------*/ const numStud = 11
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Arreglo con los titulos -----*/ const rangoEncabezados = ss.getRange(1, 1, 1, columnas).getValues();
/* Arreglo con los datos -------*/ const rangoDatos = ss.getRange(2, 1, numStud, columnas).getValues();

/*====================================================================================================================================*/
/* LABS sin hacer---------------*/ function labsSinHacer() {
/*====================================================================================================================================*/
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Borrado datos hoja UPDATE-LABS */ var borrarDatos = ssUpdateLabs.getRange(2, 1, ssUpdateLabs.getLastRow(), ssUpdateLabs.getLastColumn()).clearContent();
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Iterar en array rangoDatos --*/ rangoDatos.forEach(function (indice) {
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Cell email en UPDATE-LABS -----*/   var cellEMAIL = ssUpdateLabs.getRange(ssUpdateLabs.getLastRow() + 1, 1);
/* Cell estud en UPDATE-LABS -----*/   var cellESTUDIANTE = ssUpdateLabs.getRange(ssUpdateLabs.getLastRow() + 1, 2);
/* Cell LABS-ok en UPDATE-LABS -----*/   var celllabsOk = ssUpdateLabs.getRange(ssUpdateLabs.getLastRow() + 1, 3);
/* Cell estado en UPDATE-LABS ----*/   var cellESTADO = ssUpdateLabs.getRange(ssUpdateLabs.getLastRow() + 1, 4);
/* Cell sinhacer en UPDATE-LABS --*/   var cellSINHACER = ssUpdateLabs.getRange(ssUpdateLabs.getLastRow() + 1, 5);
/* Cell listash en UPDATE-LABS ---*/   var cellLISTASH = ssUpdateLabs.getRange(ssUpdateLabs.getLastRow() + 1, 6);
/* inicio var estado -----------*/   var estado = "";
/* inicio var numLabsSinHacer ----*/   var numLabsSinHacer = 0
/* inicio var columna del 1º LABS */   var col1LABS = 8  
/*---------------------------------------------------------------------------INGRESO DE VALORES DESDE HOJA "LABS" A LA HOJA "UPDATE-LABS" */
/* ingr email de LABS en UPDATE-LABS*/   cellEMAIL.setValue(indice[4-1]);
/* ingr estud de LABS en UPDATE-LABS*/   cellESTUDIANTE.setValue(indice[2-1]);
/* ingr labsOk de LABS en UPDATE-LABS */   celllabsOk.setValue((indice[5-1] * 100).toFixed(0));
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* loop p lista LABS sin hacer ---*/   for (i = col1LABS; i <= columnas; i++) {
/* Iterar en array rangoEncabez-*/       rangoEncabezados.forEach(function (col) {
/* si cell vacia y tit lleno ---*/         if (indice[i-1] == "" && col[i-1] != "") {
/* suma 1 contador LABS sin hacer */           numLabsSinHacer++
/* agrega linea con encabezado de
   cell vacia a cellLISTASH ----*/           cellLISTASH.setValue(cellLISTASH.getValue() + '\n' + col[i-1]);  }})}
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* si all LABS ok estado= al dia -*/   if (numLabsSinHacer == 0) {
/*------------------------------*/     var estado = "AL DIA";Logger.log(estado);
/*------------------------------*/   } else {
/* sino estado faltantes -------*/     var estado = "FALTANTES";Logger.log(estado); }
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* carga cell estado -----------*/   cellESTADO.setValue(estado);
/* carga cell sinhacer ---------*/   cellSINHACER.setValue(numLabsSinHacer);})
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Cell fecha update -----------*/   var cellFECHAUPDATE = ssUpdateLabs.getRange(2, 11);
/* carga cell fechaupdate ------*/   cellFECHAUPDATE.setValue(new Date());  }
/*====================================================================================================================================*/
/* envio email acad individual -*/ function emailInformeLabs() {
/*====================================================================================================================================*/
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* array datos en UPDATE-LABS ----*/ var rangoDatosUPDATELABS = ssUpdateLabs.getRange(2, 1, ssUpdateLabs.getLastRow() - 1, ssUpdateLabs.getLastColumn()).getValues()
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* iterar por filas del array --*/ rangoDatosUPDATELABS.forEach(
/*------------------------------*/   function crearMensaje(value) {
/*------------------------------------------------------------------------------------------------------- VARIABLES DENTRO DEL E-MAIL */
/* asigna email a variable -----*/     var email = value[0];
/* asigna email a variable -----     var ccemail = "potrerodigital@compromiso.org";*/
/* asigna estud a variable -----*/     var alumne = value[1];
/* asigna labsOk  a variable -----*/     var labsOk = value[2];
/* asigna estado a variable ----*/     var estado2 = value[3];
/* asigna sinHacer a variable --*/     var sinhacer = value[4];
/* asigna listaLABSsh a variable -*/     var listaLABSsh = value[5];
/*---------------------------------------------------------------------------------------------------------------------------- ASUNTO */
/* obt val plantilla-email -----*/     var asunto = ssPlantilla.getRange(2, 1).getValue()
/* reempl estud en asunto ------*/       .replace("{{alumne}}", alumne.toString().toUpperCase());
/*--------------------------------------------------------------------------------------------------------------------------- MENSAJE */
/*------------------------------*/     var mensaje = ssPlantilla.getRange(2, 2).getValue()
/* reempl estud en mensaje -----*/       .replace("{{alumne}}", alumne.toString().toUpperCase())
/* reempl labsOk  en mensaje -----*/       .replace("{{labsOk}}", labsOk)
/* reempl estado en mensaje ----*/       .replace("{{estado}}", estado2)
/* reempl sinhacer en mensaje --*/       .replace("{{sinhacer}}", sinhacer)
/* reempl listaLABSsh en mensaje -*/       .replace("{{listaLABSsh}}", listaLABSsh)
/*------------------------------------------------------------------------------------------------------------------ ENVIO DEL E-MAIL */
/* envio de email p cada estud -*/     GmailApp.sendEmail(email, asunto, mensaje,/*{cc: ccemail}*/);  })}
/*====================================================================================================================================*/

