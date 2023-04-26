/*------------------------------------------------------------------------------------------------------------------------------ DATE */
/* -----------------------------*/ const update = Utilities.formatDate(new Date(), "GMT-3", "EEE dd MMM HH:mm:ss");
/*------------------------------------------------------------------------------------------------------------------------------- IDS */
/* -----------------------------*/ const idGuiaEstudio = "1WabgBQaFj32YvS5l_JZHPnhUxplGBy6tYE3jLMOW5gQ"
/* -----------------------------*/ const idTarget = "1XxNcI-vpvcuiXQ3ad8R5KDlziWdF-laBNBDtDr8FmAY"
/* -----------------------------*/ const idSource = idGuiaEstudio

/*====================================================================================================================================*/
/* -----------------------------*/ function arbue_13_updateClasesContenidos() {
/*====================================================================================================================================*/
/*------------------------------------------------------------------------------------------------------------------------- CONEXIONS */
/* -----------------------------*/ var sTarget = SpreadsheetApp.openById(idTarget)
/* -----------------------------*/ var sSource = SpreadsheetApp.openById(idSource)
/*---------------------------------------------------------------------------------------------------------------------------- SOURCE */
/* -----------------------------*/ var ssSource = sSource.getSheets()
/* -----------------------------*/ var ssSource0 = ssSource[0]
/* -----------------------------*/ var ssSource1 = ssSource[1]
/*--------------------------------------------------------------------------------------------------------- COPY HOJA 0 Y 1 IN TARGET */
/* -----------------------------*/ ssSource0.copyTo(sTarget)
/* -----------------------------*/ ssSource1.copyTo(sTarget)
/*-----------------------------------------------------------------------------------------------------------------------------TARGET */
/* -----------------------------*/ var ssTarget = sTarget.getSheets()
/* -----------------------------*/ var ssTarget0 = ssTarget[0]
/* -----------------------------*/ var ssTarget1 = ssTarget[1]
/* -----------------------------*/ var ssTarget2 = ssTarget[2]
/* -----------------------------*/ var ssTarget3 = ssTarget[3]
/* -----------------------------*/ Logger.log(update);
/*----------------------------------------------------------------------------------------------------------------- RENAME AND DELETE */
/* -----------------------------*/ ssTarget2.setName("UPDATE " + update)
/* -----------------------------*/ ssTarget3.setName("CRONO " + update)
/* -----------------------------*/ sTarget.deleteSheet(ssTarget0)
/* -----------------------------*/ sTarget.deleteSheet(ssTarget1);  }
/*====================================================================================================================================*/
