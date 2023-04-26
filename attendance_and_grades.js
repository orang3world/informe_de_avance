/* CODIGO GENERADO PARA REALIZAR INFORMES Y SEGUIMIENTOS A LOS ALUMNOS DEL PROGRAMA AWS RE/START EN POTRERO DIGITAL  */



/*==================================== INICIO DE CONSTANTES Y VARIABLE ESENCIALES ===========================================================*/
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* course ----------------------*/ const course_arbue = "ARBUE_13"
/* timestamp -------------------*/ const update = Utilities.formatDate(new Date(), "GMT-3", "dd MMM HH:mm");Logger.log("1° "+update)
/* update date -----------------*/ const dteKc = Utilities.formatDate(new Date(), "GMT-3", "yyyy-MM-dd");Logger.log("2° "+ dteKc)
/* update date -----------------*/ const dteAtt = Utilities.formatDate(new Date(), "GMT-3", "yyyyMMdd");Logger.log("3° "+dteAtt)
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* GRADES_BACKUP_13 id ---------*/ const idKcFolder = "1CI5E1_yGP1jWaq3VvbxtrHqyRNN56ldF"
/* ATTENDANCE_BACKUP_13 id -----*/ const idAttFolder = "1Uaz0j5KYUNR7cOuvlg08UGoxCE32G7yv"
/* attendance_&_grades_13 id ---*/ const idAttendanceGrades = "1wKxlLj9RYj4NUzFm0rRPeo4B0Fo9pAClfQR5CnoEw70"
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Active Book Connection ------*/ const sp = SpreadsheetApp.getActiveSpreadsheet();    
/* spreadsheet connect "KC" ----*/ const ss = sp.getSheetByName('KC');
/* spreadsheet connect UPDATE-KC*/ const ssUpdateKc = sp.getSheetByName('UPDATE-KC');
/* spreadsheet connect d-kc ----*/ const d_kc = SpreadsheetApp.openById(idAttendanceGrades).getSheetByName("d-kc")
/* spreadsheet connect d-att ---*/ const d_att = SpreadsheetApp.openById(idAttendanceGrades).getSheetByName("d-att")
/* spreadsheet connect d-att ---*/ const d_assist = SpreadsheetApp.openById(idAttendanceGrades).getSheetByName("d-asist")
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* number of columns KC --------*/ const columnas = 109;
/* KC with 5 pts up the column -*/ const col5pts = 96
/* KC with 51 pts up the column */ const col51pts = 97
/* KC with 10 pts up the column */ const col10ptsA = 102
/* KC with 20 pts up the column */ const col20pts = 103
/* KC with 15 pts up the column */ const col15pts = 104
/* KC with 10 pts up the column */ const col10ptsB = 109
/* number of students ----------*/ const numStud = 45
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* array with headers ----------*/ const headerRange = ss.getRange(1, 1, 1, columnas).getValues();
/* array with datas ------------*/ const dataRange = ss.getRange(2, 1, numStud, columnas).getValues();
/* array with possible points --*/ const possiblePointsRange = ss.getRange(numStud+3, 1, 1, columnas).getValues(); 
/*------------------------------------------------------------------------------------------------------------------------------------*/
/*==================================== FIN DE CONSTANTES Y VARIABLE ESENCIALES ===========================================================*/



/*===================================== INICIO FUNCION UPDATE KC ======================================================================*/
/* spreadsheet update d-kc -----*/ function UpdateKC() {
/*====================================================================================================================================*/
/*-------------------------------------------------------------------------------- Busq inBACKUP_CALIF of files c/fecha inel titulo */
/* -----------------------------*/ var filesKc = DriveApp.getFolderById(idKcFolder).searchFiles("title contains '" + dteKc + "'")
/* 1º match = last file --------*/ var fKc = filesKc.next();
/* matching file id ------------*/ var idKcCsv = fKc.getId(); Logger.log(fKc.getId() + " " + fKc.getName());
/*------------------------------------------------------------------------------------------------------------------------------ Data */
/* file connection -------------*/ var csvKc = DriveApp.getFileById(idKcCsv);  Logger.log(csvKc)
/* get data as string ----------*/ var data = csvKc.getBlob().getDataAsString().valueOf()
/* process data separ by commas */ var csv = Utilities.parseCsv(data); Logger.log(csv)
/*----------------------------------------------------------------------------------------------------------- load of la data to d_kc */
/* Delete spreadsheet data d_kc */ d_kc.clearContents()
/* Load new spreadsh. data d_kc */ d_kc.getRange(1, 1, csv.length, csv[0].length).setValues(csv); 
/* Update Target spreadsh nº 0 -*/ d_kc.getRange(1,2).setValue("Update: "+'\n\n'+ update +'\n\n' + d_kc.getRange(1,2).getValue()) }
/*------------------------------------------------------------------------------------------------------------------------------------*/
/*======================================== FIN FUNCION UPDATE KC =========================================================================*/



/*============================================== INICIO FUNCION  ======================================================================================*/
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* spreadsheet update d-attendance -----*/ function arbue_13_update_d_attendance() {
/*====================================================================================================================================*/
/*-------------------------------------------------------------------------------- Busq en ATTENDANCE_BACKUP_13 of files c/fecha en el titulo */
/* ----------------------------- var filesAtt = DriveApp.getFolderById(idAttFolder).searchFiles("title contains '" + dteAtt + "'");*/
/* -----------------------------*/ var filesAtt = DriveApp.getFolderById(idAttFolder).searchFiles("title contains 'participant-" + (dteAtt -1) + "'");
/* -----------------------------*/ while (filesAtt.hasNext()) {  
/* 1º match = last file --------*/  var fAtt = filesAtt.next()
/* matching file id ------------*/  var idAttCsv = fAtt.getId(); Logger.log("4° "+fAtt.getId() + " " + fAtt.getName())
/* -----------------------------*/ }
/*----------------------------------------------------------------------------------------------------------------------------- Data */
/* file connection -------------*/ var csvAtt = DriveApp.getFileById(idAttCsv);  Logger.log("5° "+csvAtt)
/* get data as string ----------*/ var dataAtt = csvAtt.getBlob().getDataAsString('UTF-16').valueOf()
/* process data separ by commas */ var csv = Utilities.parseCsv(dataAtt, '\t'); Logger.log("6° "+csv) 
/*----------------------------------------------------------------------------------------------------------- load of la data to d_att */
/* Delete spreadsheet data d_kc */ d_att.clearContents()
/* Load new spreadsh. data d_kc */ d_att.getRange(1, 1, csv.length, csv[0].length).setValues(csv); 
/* Update Target spreadsh nº 0 -*/ d_att.getRange(1,2).setValue("Update: "+'\n\n'+ update +'\n\n' + d_att.getRange(1,2).getValue()) 
/*----------------------------------------------------------------------------------------------------------------------------- copy-page row e-mails */
/* -----------------------------*/ const emailsExport = d_att.getRange(1, 8, d_att.getLastRow(), 1).getValues();console.log(emailsExport)
/* -----------------------------*/ const dateArray = d_assist.getRange(2, 1, 1, d_att.getLastColumn()).getValues(); console.log(dateArray)
/* -----------------------------*/ const d_assistlC = d_assist.getRange(3,1,d_assist.getLastRow(),1).getLastRow(); console.log(d_assistlC)
/* -----------------------------*/ const emailsImport = d_assist.getRange(3, d_assist.getLastColumn()+1, d_att.getLastRow(), 1).setValues(emailsExport);console.log(emailsImport)}
/*------------------------------------------------------------------------------------------------------------------------------------*/
/*======================================== FIN FUNCION  =========================================================================*/



/*================================================ INICION FUNCION  ====================================================================================*/
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* copy to backoffice_13_update */ function backoffice_13 (){
/*====================================================================================================================================*/ 
/*------------------------------------------------------------------------------------------------------------------------------- IDS */
/* book target id --------------*/ var idTarget = "1JWu3OIqFmniszlIjv1NXHhJiaZXOqKzU3Nmj4N5MvjY"
/* fte attendance_&_grades_13 --*/ var idSource = idAttendanceGrades
/*------------------------------------------------------------------------------------------------------------------------- CONEXIONS */
/* Link to Target book ---------*/ var sTarget = SpreadsheetApp.openById(idTarget)
/* Link to Source book ---------*/ var sSource = SpreadsheetApp.openById(idSource)
/*---------------------------------------------------------------------------------------------------------------------------- SOURCE */
/* Get spreadsh from source book*/ var ssSource = sSource.getSheets()
/* identify spreadsheet KC -----*/ var ssSource0 = ssSource[0]
/* Get range data KC spreadsh --*/ var rangeSource0=ssSource0.getDataRange()
/* KC spreadsheet data array ---*/ var valuesSource0=rangeSource0.getValues()
/*--------------------------------------------------------------------------------------------------------------------------- COPY KC */
/* Add KC Spreadsheet to Target */ ssSource0.copyTo(sTarget)
/*---------------------------------------------------------------------------------------------------------------------------- TARGET */
/* Get spreadsh from target book*/ var ssTarget = sTarget.getSheets()
/* identify target spreads nº 0 */ var ssTarget0 = ssTarget[0]
/* identify target spreads nº 1 */ var ssTarget1 = ssTarget[1]
/* identify target spreads nº 2 */ var ssTarget2 = ssTarget[2]
/* identify target spreads nº 0 */ var kcAsist13 = sTarget.getSheetByName("kc-asist-13")
/* Get range target sspread nº 2*/ var rangeTarget2=ssTarget2.getDataRange()
/* Load values to target nº 2 --*/ var newTarget2=rangeTarget2.setValues(valuesSource0)
/* Delete target spreadsh nº 1 -*/ sTarget.deleteSheet(kcAsist13)
/* Rename target spradsh nº 2 --*/ ssTarget2.setName("kc-asist-13")
/* Update Target spreadsh nº 0 -*/ ssTarget0.getRange(1,8).setValue("Update "+'\n'+ update)
/* Update Target spreadsh nº 0 -*/ ssTarget0.getRange(1,1).setValue(course_arbue) }
/*------------------------------------------------------------------------------------------------------------------------------------*/
/*============================================== FIN FUNCION  ======================================================================================*/



/*============================================= INICIO FUNCION  =======================================================================================*/
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* undone and low grade kc -*/ function undoneKc_13 () {
/*====================================================================================================================================*/
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Delete spreadsheet data UPDATE-KC */ var borrarDatos = ssUpdateKc.getRange(2, 1, ssUpdateKc.getLastRow(), ssUpdateKc.getLastColumn()).clearContent();
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Iterate through dataRange ---*/ dataRange.forEach(function (indice) {
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Cell email inUPDATE-KC ------*/   var cellEmail = ssUpdateKc.getRange(ssUpdateKc.getLastRow() + 1, 1);
/* Cell estud inUPDATE-KC ------*/   var cellStudent = ssUpdateKc.getRange(ssUpdateKc.getLastRow() + 1, 2);
/* Cell asist inUPDATE-KC ------*/   var cellAttendance = ssUpdateKc.getRange(ssUpdateKc.getLastRow() + 1, 3);
/* Cell kc-ok inUPDATE-KC ------*/   var cellKcOk = ssUpdateKc.getRange(ssUpdateKc.getLastRow() + 1, 4);
/* Cell state inUPDATE-KC ------*/   var cellState = ssUpdateKc.getRange(ssUpdateKc.getLastRow() + 1, 5);
/* Cell totalFalt inUPDATE-KC --*/   var cellTOTALFALT = ssUpdateKc.getRange(ssUpdateKc.getLastRow() + 1, 6);
/* Cell notDone inUPDATE-KC ----*/   var cellNotDone = ssUpdateKc.getRange(ssUpdateKc.getLastRow() + 1, 7);
/* Cell listash inUPDATE-KC ----*/   var cellNotDoneList = ssUpdateKc.getRange(ssUpdateKc.getLastRow() + 1, 8);
/* Cell lowGrade inUPDATE-KC ---*/   var cellLowGrades = ssUpdateKc.getRange(ssUpdateKc.getLastRow() + 1, 9);
/* Cell listabn inUPDATE-KC ----*/   var cellLowGradesList = ssUpdateKc.getRange(ssUpdateKc.getLastRow() + 1, 10);
/*----------------------------------------------------------------------------------------------------------- INICIACION DE VARIABLES */
/* starting var state ----------*/   var state = "";
/* starting var numNotDoneKc ---*/   var numNotDoneKc = 0
/* starting var numLowGradesKc -*/   var numLowGradesKc = 0
/* starting var row of 1º kc ---*/   var col1KC = 10  
/* starting var row of 1º kc ---*/   var pApproval = 0.7  
/*---------------------------------------------------------------------------INGRESO of VALORES DESDE HOJA "KC" to LA HOJA "UPDATE-KC" */
/* enter email of KC inUPDATE-KC*/   cellEmail.setValue(indice[3]);
/* enter estud of KC inUPDATE-KC*/   cellStudent.setValue(indice[1]);
/* enter assis of KC inUPDATE-KC*/   cellAttendance.setValue((indice[4] * 100).toFixed(0));
/* enter kcok of KC inUPDATE-KC */   cellKcOk.setValue((indice[5] * 100).toFixed(0));
/*------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------*/   cellNotDoneList.setValue(cellNotDoneList.getValue() + '<ol>' + '\n')
/* loop p lista kc sin hacer ---*/   for (i = col1KC; i <= columnas; i++) {
/* Iterate through headerRange -*/       headerRange.forEach(function (col) {
/* if cell empty & header full -*/         if (indice[i-1] == "" && col[i-1] != "") {
/* add 1 counter kc not done ---*/           numNotDoneKc++
/*------------------------------*/   console.log(numNotDoneKc)
/* add line with empty cell ----*/           cellNotDoneList.setValue(cellNotDoneList.getValue() + '<li>'+ col[i-1] + '</li>' + '\n');  }})}
/* header to cellNotDoneList ---*/           
/*------------------------------*/   cellNotDoneList.setValue(cellNotDoneList.getValue() + '</ol>')  
/*------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------*/   cellLowGradesList.setValue(cellLowGradesList.getValue() + '<ol>' + '\n')
/* loop kc 5 pts ---------------*/   for (i = col1KC; i < columnas; i++) {
/*------------------------------*/       headerRange.forEach(function (col) {
/* if grade <4 & header full ---*/          if (indice[i-1] != "" && col[i-1] != "") {
/*------------------------------*/             possiblePointsRange.forEach(function (pointsP) {
                                                if (indice[i-1] < pointsP[i-1]*pApproval) { 
/* add 1 counter low grade -----*/                  numLowGradesKc++
/*------------------------------*/   console.log(numNotDoneKc)
/* add line with header cell ---*/                  cellLowGradesList.setValue(cellLowGradesList.getValue() + '<li>'+ col[i-1] + '</li>' + '\n');}})
/* grade <4 cellLowGradesList --*/                  }})}
/*------------------------------*/   cellLowGradesList.setValue(cellLowGradesList.getValue() + '</ol>' )
/*------------------------------------------------------------------------------------------------------------------------------------*/     

/*------------------------------------------------------------------------------------------------------------------------------------*/
/* if all kc ok state= al dia --*/   if (numNotDoneKc + numLowGradesKc == 0) {
/*------------------------------*/     var state = "AL DIA";Logger.log(state);
/*------------------------------*/   } else {
/* else state= faltantes -------*/     var state = "FALTANTES";Logger.log(state); }
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* load cell state -------------*/   cellState.setValue(state);
/* load cell not done ----------*/   cellNotDone.setValue(numNotDoneKc);
/* load cell low grade ---------*/   cellLowGrades.setValue(numLowGradesKc);
/* load cell totalfalt ---------*/   cellTOTALFALT.setValue(numLowGradesKc + numNotDoneKc); })
/*------------------------------------------------------------------------------------------------------------------------------------*/
/* Cell update date ------------*/   var cellUpdateDate = ssUpdateKc.getRange(2, 11);
/* load cell update date -------*/   cellUpdateDate.setValue(new Date());  }
/*------------------------------------------------------------------------------------------------------------------------------------*/
/*=============================================== FIN FUNCION  =====================================================================================*/


/*========================= INICIO DE LA FUNCION INFORME ACADEMICO ====================================================================*/

/* send email to each student --*/ 
function InformeAcademico() {

/* array datas in update-kc ----*/ 
var dataRangeUPDATEKC = ssUpdateKc.getRange(2, 1, ssUpdateKc.getLastRow() - 1, ssUpdateKc.getLastColumn()).getValues()

/* iterate through array rows --*/   
dataRangeUPDATEKC.forEach(
 
function crearMensaje(value) {
/* VARIABLES DENTRO DEL E-MAIL */

/* assign email to variable ----*/          
var email = value[0];

/* assign email cc to variable -*/        
var ccemail ="potrerodigital@compromiso.org";

/* assign estud to variable ----*/        
var student = value[1];

/* assign assis to variable ----*/     
var attendance = value[2];

/* assign kcok  to variable ----*/           
var kcok = value[3];

/* assign state to variable ----*/         
var state2 = value[4];

/* assign totFalt to variable --*/      
var totalfalt = value[5];

/* assign sinHacer to variable -*/        
var notDone = value[6];

/* assign notDoneKcList to var -*/  
var notDoneKcList = value[7];

/* assign lowGrade to variable -*/       
var lowGrade = value[8];

/* assign lowGradeKcList to var */ 
var lowGradeKcList = value[9];

/* generate dicc c/datos of prof*/      
var dict_prof = {
  "leandro.garrido@compromiso.org" : "Leandro Garrido",
  "ariel.orange@compromiso.org" : "Ariel Orange",
  "emiliano.piai@compromiso.org" : "Emiliano Piai" };

/*assign email_prof to variable */     
var email_prof = Session.getActiveUser().getEmail();
/* search email & assign to var */   

/* assign name_prof to var -----*/      
var name_prof = dict_prof[email_prof]; 
/* assign to name_prof value ---*/ 
/* from dict_prof --------------*/

/* GENERO FIRMA INSTRUCTOR */
/* utilizar https://codepen.io/ para el armado del HTML */

var signature_leandro = '<table cellspacing="0" cellpadding="0" border="0" style="width: 100%;"> <tbody> <tr class="signature" style=""> <td valign="top" align="center" class="center-on-narrow stack-column" style="width: 100%; overflow: hidden;"> <div style="border: 0px solid transparent;color: #f1f4f6; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.2; Margin: 25px 20px 25px 25px; max-height: none; max-width: none; padding: 0px; text-decoration: none;"> <div> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="4" class="nombre"> <b>Leandro Garrido</b> | Instructor </font> </div> <div> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3">AWS Certified Associate<br></font> <div class=""> <font size="3"><b> <font face="&quot;Arial&quot;, Helvetica, sans-serif"> <a href="http://compromiso.org/" style="color: #ec7211;" class="">compromiso.org</a> </font> </b></font> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3">| </font> <font size="3"><b> <font face="&quot;Arial&quot;, Helvetica, sans-serif"> <a href="http://potrerodigital.org/" class="" style="color: #ec7211;">potrerodigital.org</a> </font> </b></font> <br> </div> <div class="firm"> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3"> Cel. +54 9 11 5895-3808</font> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3">| </font> <font size="2"><b> <font face="&quot;Arial&quot;, Helvetica, sans-serif"> <a href="https://www.linkedin.com/in/leandro-garrido/" class="" style="color: #ec7211;">LinkedIn</a> </font> </b></font> <br> </div> </div> </div> </td> </tr> <tr class="signature"> <td valign="top" align="center" class="center-on-narrow stack-column" style="width: 100%; overflow: hidden; vertical-align: bottom; padding-bottom: 15px;"> <img src="https://ci4.googleusercontent.com/proxy/ZDZm9x8NP-OYdpemo9sXn8iq8qc7K4FslWZBBTo1zg21pCjv13Ph6KMzbIU0g2oAkEU71HA-gMsWoqGwPYj7vWpnD7xZARpNotH0BnphC7aMccAc7618dQO8o_dLzeDBDGu2yiynJvrX1or5KzfM=s0-d-e1-ft#https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png" alt="AWS Certified Cloud Practitioner" width="96" height="96" class="CToWUd" data-bit="iit"> <img src="https://ci3.googleusercontent.com/proxy/VpBzkJjDHaXcQzbidXDpRdPSPahgJpbU0hDNcIlrLBYVjLsxUevGLzYdvNk6KUL8LCGpejdGVl6U02zuSjo3ga91sTAokXYo1Tm1Z3t0Kc1p6h4xg6shcgYuMVmy_rP_SmFkXtreax1p1qLovE3N=s0-d-e1-ft#https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png" alt="AWS Certified Solutions Architect – Associate" width="96" height="96" class="CToWUd" data-bit="iit"> <img src="https://ci3.googleusercontent.com/proxy/ep9w9gvBrTwl4kJ19bQf0B3BaFV-O9Bfd1ooVx2pJWVong0E4Sxa2NdRdZ5Atfs36cC13_SfW3IeTqCmO9lneyty4VFwiSvX7QC096MWg_sDU0o8-EvZBX1FWgbS5FH3q1DWlDqudPGTeUEpNpiM=s0-d-e1-ft#https://images.credly.com/size/340x340/images/44e2c252-5d19-4574-9646-005f7225bf53/image.png" alt="AWS re/Start Graduate" width="96" height="96" class="CToWUd" data-bit="iit"> <img src="https://ci6.googleusercontent.com/proxy/R-aIAR8Uu3ffYUJisbl6bfL1YWUP8r_JXip-EIbcQV-er5fz-wbsvK4HA7qItSyDrVV70pze-9hgT6MPwt2pfkYAIUtPwNtIASl_1MxA1MCaVn4soT1EGZpv5XsakDHw8PqTsVXIvbFtVLfQaZqw=s0-d-e1-ft#https://images.credly.com/size/340x340/images/e426d40e-8a6a-4f72-866e-2abfcfbde46b/image.png" alt="AWS re/Start Accredited Instructor" width="96" height="96" class="CToWUd" data-bit="iit"> </td> </tr> </tbody> </table>';

var signature_ariel = '<table cellspacing="0" cellpadding="0" border="0" style="width: 100%;"> <tbody> <tr class="signature" style=""> <td valign="top" align="center" class="center-on-narrow stack-column" style="width: 100%; overflow: hidden;"> <div style="border: 0px solid transparent;color: #f1f4f6; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.2; Margin: 25px 20px 25px 25px; max-height: none; max-width: none; padding: 0px; text-decoration: none;"> <div> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="4" class="nombre"> <b>Ariel Orange</b> | Instructor </font> </div> <div> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3">AWS Certified Associate<br></font> <div class=""> <font size="3"><b> <font face="&quot;Arial&quot;, Helvetica, sans-serif"> <a href="http://compromiso.org/" style="color: #ec7211;" class="">compromiso.org</a> </font> </b></font> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3">| </font> <font size="3"><b> <font face="&quot;Arial&quot;, Helvetica, sans-serif"> <a href="http://potrerodigital.org/" class="" style="color: #ec7211;">potrerodigital.org</a> </font> </b></font> <br> </div> <div class="firm"> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3"> Cel. +54 9 11 3388-1887</font> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3">| </font> <font size="2"><b> <font face="&quot;Arial&quot;, Helvetica, sans-serif"> <a href="https://www.linkedin.com/in/ariel-orange/" class="" style="color: #ec7211;">LinkedIn</a> </font> </b></font> <br> </div> </div> </div> </td> </tr> <tr class="signature"> <td valign="top" align="center" class="center-on-narrow stack-column" style="width: 100%; overflow: hidden; vertical-align: bottom; padding-bottom: 15px;"> <img src="https://ci3.googleusercontent.com/proxy/ep9w9gvBrTwl4kJ19bQf0B3BaFV-O9Bfd1ooVx2pJWVong0E4Sxa2NdRdZ5Atfs36cC13_SfW3IeTqCmO9lneyty4VFwiSvX7QC096MWg_sDU0o8-EvZBX1FWgbS5FH3q1DWlDqudPGTeUEpNpiM=s0-d-e1-ft#https://images.credly.com/size/340x340/images/44e2c252-5d19-4574-9646-005f7225bf53/image.png" alt="AWS re/Start Graduate" width="96" height="96" class="CToWUd" data-bit="iit"><img src="https://ci4.googleusercontent.com/proxy/ZDZm9x8NP-OYdpemo9sXn8iq8qc7K4FslWZBBTo1zg21pCjv13Ph6KMzbIU0g2oAkEU71HA-gMsWoqGwPYj7vWpnD7xZARpNotH0BnphC7aMccAc7618dQO8o_dLzeDBDGu2yiynJvrX1or5KzfM=s0-d-e1-ft#https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png" alt="AWS Certified Cloud Practitioner" width="96" height="96" class="CToWUd" data-bit="iit"> <img src="https://ci3.googleusercontent.com/proxy/VpBzkJjDHaXcQzbidXDpRdPSPahgJpbU0hDNcIlrLBYVjLsxUevGLzYdvNk6KUL8LCGpejdGVl6U02zuSjo3ga91sTAokXYo1Tm1Z3t0Kc1p6h4xg6shcgYuMVmy_rP_SmFkXtreax1p1qLovE3N=s0-d-e1-ft#https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png" alt="AWS Certified Solutions Architect – Associate" width="96" height="96" class="CToWUd" data-bit="iit">  <img src="https://ci6.googleusercontent.com/proxy/R-aIAR8Uu3ffYUJisbl6bfL1YWUP8r_JXip-EIbcQV-er5fz-wbsvK4HA7qItSyDrVV70pze-9hgT6MPwt2pfkYAIUtPwNtIASl_1MxA1MCaVn4soT1EGZpv5XsakDHw8PqTsVXIvbFtVLfQaZqw=s0-d-e1-ft#https://images.credly.com/size/340x340/images/e426d40e-8a6a-4f72-866e-2abfcfbde46b/image.png" alt="AWS re/Start Accredited Instructor" width="96" height="96" class="CToWUd" data-bit="iit"> </td> </tr> </tbody></table>';

var signature_emiliano = '<table cellspacing="0" cellpadding="0" border="0" style="width: 100%;"> <tbody> <tr class="signature" style=""> <td valign="top" align="center" class="center-on-narrow stack-column" style="width: 100%; overflow: hidden;"> <div style="border: 0px solid transparent;color: #f1f4f6; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.2; Margin: 25px 20px 25px 25px; max-height: none; max-width: none; padding: 0px; text-decoration: none;"> <div> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="4" class="nombre"> <b>Emiliano Piaio</b> | Tutor </font> </div> <div> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3">AWS Certified Associate<br></font> <div class=""> <font size="3"><b> <font face="&quot;Arial&quot;, Helvetica, sans-serif"> <a href="http://compromiso.org/" style="color: #ec7211;" class="">compromiso.org</a> </font> </b></font> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3">| </font> <font size="3"><b> <font face="&quot;Arial&quot;, Helvetica, sans-serif"> <a href="http://potrerodigital.org/" class="" style="color: #ec7211;">potrerodigital.org</a> </font> </b></font> <br> </div> <div class="firm"> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3"> Cel. +54 9 2616 65-1022</font> <font color="#f1f4f6" face="Arial, Helvetica, sans-serif" size="3">| </font> <font size="2"><b> <font face="&quot;Arial&quot;, Helvetica, sans-serif"> <a href="https://www.linkedin.com/in/emiliano-piai-826b7a233/" class="" style="color: #ec7211;">LinkedIn</a> </font> </b></font> <br> </div> </div> </div> </td> </tr> <tr class="signature"> <td valign="top" align="center" class="center-on-narrow stack-column" style="width: 100%; overflow: hidden; vertical-align: bottom; padding-bottom: 15px;"> <img src="https://ci4.googleusercontent.com/proxy/ZDZm9x8NP-OYdpemo9sXn8iq8qc7K4FslWZBBTo1zg21pCjv13Ph6KMzbIU0g2oAkEU71HA-gMsWoqGwPYj7vWpnD7xZARpNotH0BnphC7aMccAc7618dQO8o_dLzeDBDGu2yiynJvrX1or5KzfM=s0-d-e1-ft#https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png" alt="AWS Certified Cloud Practitioner" width="96" height="96" class="CToWUd" data-bit="iit"> <img src="https://ci3.googleusercontent.com/proxy/VpBzkJjDHaXcQzbidXDpRdPSPahgJpbU0hDNcIlrLBYVjLsxUevGLzYdvNk6KUL8LCGpejdGVl6U02zuSjo3ga91sTAokXYo1Tm1Z3t0Kc1p6h4xg6shcgYuMVmy_rP_SmFkXtreax1p1qLovE3N=s0-d-e1-ft#https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png" alt="AWS Certified Solutions Architect – Associate" width="96" height="96" class="CToWUd" data-bit="iit"> <img src="https://ci3.googleusercontent.com/proxy/ep9w9gvBrTwl4kJ19bQf0B3BaFV-O9Bfd1ooVx2pJWVong0E4Sxa2NdRdZ5Atfs36cC13_SfW3IeTqCmO9lneyty4VFwiSvX7QC096MWg_sDU0o8-EvZBX1FWgbS5FH3q1DWlDqudPGTeUEpNpiM=s0-d-e1-ft#https://images.credly.com/size/340x340/images/44e2c252-5d19-4574-9646-005f7225bf53/image.png" alt="AWS re/Start Graduate" width="96" height="96" class="CToWUd" data-bit="iit">  </td> </tr> </tbody> </table>'

/* generate dicc w/datas of prof*/     

var dict_signature = {
  "leandro.garrido@compromiso.org" : signature_leandro,
  "ariel.orange@compromiso.org" : signature_ariel,
  "emiliano.piai@compromiso.org" : signature_emiliano};

/* busca y asigna firma del instructor segun su mail */     
var signature_profe = dict_signature[email_prof]; 

/* usar https://www.textfixer.com/html/compress-html-compression.php para generar html en una sola linea */

var body_html= HtmlService.createHtmlOutput('<html><head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="robots" content="noindex"> <base target="_blank"> <style type="text/css"> body, div[style*="margin: 16px 0"], html { margin: 0 !important } body, html { padding: 0 !important; height: 100% !important; width: 100% !important } * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100% } table, td { mso-table-lspace: 0 !important; mso-table-rspace: 0 !important } table { border-spacing: 0 !important; border-collapse: collapse !important; margin: 0 auto !important } table table table { table-layout: auto } img { -ms-interpolation-mode: bicubic } .yshortcuts to { border-bottom: none !important } .mobile-link--footer a, a[x-apple-data-detectors] { color: inherit !important; text-decoration: underline !important } .signature{ background-color: #232f3e; } @media screen and (max-width:600px) { .stack-column-half { width: 50% !important; display: inline-block !important } .center-on-narrow, .fluid, .fluid-centered { margin-left: auto !important; margin-right: auto !important } table { table-layout: fixed !important } .email-container { width: 100% !important } .fluid, .fluid-centered { max-width: 100% !important; height: auto !important } .stack-column, .stack-column-center, .stack-column-full-width { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important } .center-on-narrow { display: block !important; float: none !important } table.center-on-narrow { display: inline-block !important } .stack-column-full-width .eddie-wrapper { color: white; width: 100% } } </style></head><body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <table cellspacing="0" cellpadding="0" border="0" width="100%" style="font-family: Helvetica, Arial, sans-serif; width: 100%; padding: 20px; background-color: rgb(235, 235, 235); background-image: none;"> <tbody> <tr> <td align="center"> <table class="email-container" width="660"> <tbody> <tr> <td> <div class="eddie-page"> <!-- barra inicial --> <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;"> <tbody> <tr style="background-color: #232f3e;"> <td valign="top" align="center" stackclass="stack-column-full-width" class="stack-column-full-width" style="width: 50%; overflow: hidden;"> <img src="https://d1.awsstatic.com/training-and-certification/Logos/aws_restart_logo_reverse.860113148166c4742ebd63e8fa74d09ae4cf64ea.png" width="auto" height="auto" class="fluid" style="border: 0px solid transparent;width:50%; color: rgb(0, 0, 0); display: block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.35; Margin: 5px; max-height: none; max-width: none; padding: 5px; text-decoration: none; min-height: 10px;" alt=""> </td> <td valign="top" align="left" stackclass="stack-column-full-width" class="stack-column-full-width" style="width: 50%; overflow: hidden;"> <img src="https://static.wixstatic.com/media/5b90eb_2f1f983af79a4e69ba942bc0586dbb7d~mv2.png/v1/fill/w_382,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/potrero_digital_2021_edited.png" width="auto" height="auto" class="fluid" style="border: 0px solid transparent;width: 80%; color: rgb(0, 0, 0); display: block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.35; Margin: 10px; max-height: none; max-width: none; padding: 10px; text-decoration: none; min-height: 10px;" alt=""> </td> </tr> </tbody> </table> <!-- imagen grande --> <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;"> <tbody> <tr style="background-color: #ec7211;"> <td valign="top" class="center-on-narrow stack-column" style="width: 100%; overflow: hidden;"> <div style="border: 0px solid transparent;color: #ec7211; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.2; Margin: 25px 20px 25px 25px; max-height: none; max-width: none; padding: 0px; text-decoration: none;"> <div style="text-align:center;"> <font color="white" face="Arial, Helvetica, sans-serif" size="7"> <b>Informe Académico</b> </font> </div> </div> </td> </tr> </tbody> </table> <!-- cuerpo --> <table cellspacing="0" cellpadding="0" border="0" style="width: 700px; height: 528px;"> <tbody> <tr style="background-color: #ced2d5;"> <td valign="top" class="center-on-narrow stack-column" style="width: 100%; overflow: hidden;"> <div style="border: 0px solid transparent;color: #ec7211; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.2; Margin: 25px 20px 25px 25px; max-height: none; max-width: none; padding: 0px; text-decoration: none;"> <div style=""> <font color="#000000" face="Arial, Helvetica, sans-serif" size="4"> <p><b>Informe académico de</b>: '+ student.toString().toUpperCase() +'</p> <p><b>Porcentaje de asistencia</b>: '+ attendance +'</p> <p><b>Porcentaje de KC realizados</b>: '+ kcok +'</p> <p><b>estado de los KC</b>: '+ state2 +'</p> <p><b>Cantidad de KC pendientes</b>: '+ totalfalt +'</p> <p><b>Cantidad de KC sin realizar</b>: '+ notDone +'</p> <p><b>Lista de los KC sin realizar</b>: </p> <ul>'+ notDoneKcList +'</ul> <p><b>Cantidad de KC con baja nota</b>: '+ lowGrade +'</p> <p><b>Lista de KC con baja nota</b>:</p> <ul>'+ lowGradeKcList +'</ul> <p>Cualquier inquietud, el grupo de docentes estamos para ayudarles.</p> <p>* Los KC con BAJA NOTA son aquiellos con menos del 70% de la nota maxima.</p> <p>* Recuerden realizar las "Notas of salida" (Exit Tickets).</p> </font> </div> </div> </td> </tr> </tbody> </table> <!--signature--> '+ signature_profe +' <!-- separador --> <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;"> <tbody> <tr style="background-color: #ced2d5"> <td valign="top" class="stack-column" style="width: 100%; overflow: hidden;"> <div style="border: 0px solid transparent;color: rgb(0, 0, 0); display: block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.35; Margin: 1px 25px; max-height: none; max-width: none; padding: 0px; text-decoration: none; height: 3px; background-color: #232f3e;"> </div> </td> </tr> </tbody> </table> <!-- footer --> <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;"> <tbody> <tr style="background-color: #232f3e;"> <td valign="top" align="center" class="stack-column" style="width: 100%; overflow: hidden;"> <span class="eddie-wrapper" style="display: inline-block; Margin: 20px 10px 20px 0px"><a href="https://www.facebook.com/potrerodigital/" data-interests="" style="text-decoration: none;"><img src="http://cdn.pemres02.net/10433/recurso-9.png" alt="Facebook" width="auto" height="auto" class="fluid" style="border: 0px solid transparent;width: auto; height: auto; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.35; Margin: 0px; max-height: none; max-width: none; padding: 0px; text-decoration: none;" data-margin="20px 10px 20px 0px"></a></span> <span class="eddie-wrapper" style="display: inline-block; Margin: 20px 10px 20px 0px"><a href="https://www.linkedin.com/company/potrero-digital/mycompany/" data-interests="" style="text-decoration: none;"><img src="http://cdn.pemres02.net/10433/recurso-8.png" alt="LinkedIn" width="auto" height="auto" class="fluid" style="border: 0px solid transparent;width: auto; height: auto; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.35; Margin: 0px; max-height: none; max-width: none; padding: 0px; text-decoration: none;" data-margin="20px 10px 20px 0px"></a></span> <span class="eddie-wrapper" style="display: inline-block; Margin: 20px 10px 20px 0px"><a href="https://www.instagram.com/potrerodigital/" data-interests="" style="text-decoration: none;"><img src="http://cdn.pemres02.net/10433/recurso-10.png" alt="Instagram" width="auto" height="auto" class="fluid" style="border: 0px solid transparent;width: auto; height: auto; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.35; Margin: 0px; max-height: none; max-width: none; padding: 0px; text-decoration: none;" data-margin="20px 10px 20px 0px"></a></span> <span class="eddie-wrapper" style="display: inline-block; Margin: 20px 10px 20px 0px"><a href="https://www.youtube.com/channel/UCkh0OTzDBAtqKtXjHFqQinQ" data-interests="" style="text-decoration: none;"><img src="http://cdn.pemres02.net/10433/recurso-11.png" alt="Youtube" width="auto" height="auto" class="fluid" style="border: 0px solid transparent;width: auto; height: auto; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; line-height: 1.35; Margin: 0px; max-height: none; max-width: none; padding: 0px; text-decoration: none;" data-margin="20px 10px 20px 0px"></a></span> </td> </tr> </tbody> </table> </div> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>');

var new_subject= "Informe Académico "+ student.toString().toUpperCase() +" - AWS re/Start "+ course_arbue;
var empty_msj = "";

/* ENVIO DEL E-MAIL */
/* send email to each student -*/     
GmailApp.sendEmail(email, new_subject,empty_msj,{ cc: ccemail ,attachments: body_html});  })}

/*================================== FINAL DE LA FUNCION INFORME ACADEMICO ====================================================================================*/



