function onEdit() {
  var file =SpreadsheetApp.getActiveSpreadsheet();
  var sheetFormato = file.getSheetByName("FORMATO");
  var sheetListado = file.getSheetByName("listado");
  var sheetActivos = file.getSheetByName("activos");
  
  var cellActive = sheetFormato.getActiveCell().getValue();
  var rowActive =sheetFormato.getActiveCell().getRow();
  var colActive =sheetFormato.getActiveCell().getColumn();
  
   
  
  if (rowActive ==6 && colActive ==8){
    
    
    var codesUDS = sheetListado.getRange(1, 1,1,24).getValues();
    var udsSelected = sheetFormato.getRange(6, 14).getValue();

    var indice =codesUDS[0].indexOf(udsSelected)+1;

    var idsNinos = sheetListado.getRange(3, indice,10);
    
    var rule= SpreadsheetApp.newDataValidation().requireValueInRange(idsNinos).build();
    sheetFormato.getRange(11, 2,10).clearDataValidations();
    sheetFormato.getRange(11, 2,10).setDataValidation(rule);
    
    sheetFormato.setActiveRange(sheetFormato.getRange("F6"));
  }
  
  if (rowActive ==6 && colActive ==8){
    sheetFormato.setActiveRange(sheetFormato.getRange("B11"));
  }
  
  
  
  if (colActive ==2){
    var idSeleccionado = sheetFormato.getRange(rowActive, 2).getValue();
  
    var indice =findIndiceOfActive(idSeleccionado);
  
    cargarDatos(indice,rowActive,idSeleccionado );
    
  }
  if (colActive ==3){
    validaCambioNombre(sheetFormato.getRange(rowActive, 2).getValue(),sheetFormato.getRange(rowActive, 3).getValue());
    
  }
  if (colActive >=4 &&colActive<=7){//columnas de formato
    
    validaCambios(sheetFormato.getRange(rowActive, 2).getValue(),colActive+10,sheetFormato.getRange(rowActive, colActive).getValue());
    
  }
  if (colActive ==8){//columnas de formato
    
    validaCambioTelefono(sheetFormato.getRange(rowActive, 2).getValue(),sheetFormato.getRange(rowActive, colActive).getValue());
    
  }
  
  
  
  if ( colActive ==11){
    var llamadaExistosa = sheetFormato.getRange(rowActive, colActive).getValue();
    if(llamadaExistosa=="NO"){
      
      sheetFormato.getRange(rowActive, 12).setValue("");
      sheetFormato.getRange(rowActive, 13).setValue("");
      sheetFormato.getRange(rowActive, 14).setValue("");
      sheetFormato.getRange(rowActive, 15).setValue("");
      sheetFormato.getRange(rowActive, 16).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 17).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 18).setValue("");
      sheetFormato.getRange(rowActive, 19).setValue("");
      sheetFormato.getRange(rowActive, 20).setValue("");
      sheetFormato.getRange(rowActive, 21).setValue("");
      
      sheetFormato.getRange(rowActive, 23).setValue("");
      sheetFormato.getRange(rowActive, 24).setValue("");
      sheetFormato.getRange(rowActive, 25).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 26).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 27).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 28).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 29).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 30).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 31).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 32).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 33).setValue("NO APLICA");
      sheetFormato.getRange(rowActive, 34).setValue("");
      sheetFormato.getRange(rowActive, 35).setValue("");
      
    }
    else{
         var idSeleccionado = sheetFormato.getRange(rowActive, 2).getValue();
      var indice =findIndiceOfActive(idSeleccionado);
      for(var iter= 12; iter<=21;iter++ ){
        sheetFormato.getRange(rowActive, iter).setValue(sheetActivos.getRange(indice, iter+10).getValue());
      }
      for(var iter= 23; iter<=35;iter++ ){
        sheetFormato.getRange(rowActive, iter).setValue(sheetActivos.getRange(indice, iter+10).getValue());
      }
    }
    
  }
  
  if (colActive >=12 &&colActive<=21){//columnas de formato
    
    validaCambios(sheetFormato.getRange(rowActive, 2).getValue(),colActive+10,sheetFormato.getRange(rowActive, colActive).getValue());
    
  }
  if (colActive >=23 && colActive<=35){//columnas de formato
    
    validaCambios(sheetFormato.getRange(rowActive, 2).getValue(),colActive+10,sheetFormato.getRange(rowActive, colActive).getValue());
    
  }
  
  
  
  
  
}
function validaCambios(idNino,colDatoActivo, datoFormato){
  var file =SpreadsheetApp.getActiveSpreadsheet();
  var indice =findIndiceOfActive(idNino);
  var sheetActivos = file.getSheetByName("activos");
  
  if(datoFormato!=sheetActivos.getRange(indice, colDatoActivo).getValue()){
    sheetActivos.getRange(indice, colDatoActivo).setValue(datoFormato);
  }
  
}

function validaCambioNombre(idNino,nameFullFormato){
  var file =SpreadsheetApp.getActiveSpreadsheet();
  var indice =findIndiceOfActive(idNino);
  var sheetActivos = file.getSheetByName("activos");
  
  if(nameFullFormato!=sheetActivos.getRange(indice, 3).getValue()){
    sheetActivos.getRange(indice, 4).setValue(nameFullFormato);
    sheetActivos.getRange(indice, 5).setValue("tiket");
  }
  else{
    sheetActivos.getRange(indice, 4).setValue("");
    sheetActivos.getRange(indice, 5).setValue("");
  }
  
  
}
function validaCambioTelefono(idNino,telFormato){
  var file =SpreadsheetApp.getActiveSpreadsheet();
  var indice =findIndiceOfActive(idNino);
  var sheetActivos = file.getSheetByName("activos");
  
  if(telFormato!=sheetActivos.getRange(indice, 6).getValue()){
    sheetActivos.getRange(indice, 7).setValue(telFormato);
    sheetActivos.getRange(indice, 8).setValue("cambiar en cuentame");
  }
  else{
    sheetActivos.getRange(indice, 7).setValue("");
    sheetActivos.getRange(indice, 8).setValue("");
  }
  
  
}


function findIndiceOfActive(idSeleccionado){
  var file =SpreadsheetApp.getActiveSpreadsheet();
  idSeleccionado = idSeleccionado+"";
  var sheetActivos = file.getSheetByName("activos");
  var ids_Activos =sheetActivos.getRange(300,1,1, sheetActivos.getLastColumn()).getValues();

  var indice =ids_Activos[0].indexOf(idSeleccionado)+4;
  Logger.log("indice "+indice);
  Logger.log("idSeleccionado "+idSeleccionado);
  return indice;//************************
}


function cargarDatos(indice, rowFormato, idNino){
  var file =SpreadsheetApp.getActiveSpreadsheet();
  var sheetFormato = file.getSheetByName("FORMATO");
  var sheetListado = file.getSheetByName("listado");
  var sheetActivos = file.getSheetByName("activos");

  //cargar nombre
  var nombreCorregido =sheetActivos.getRange(indice, 4).getValue();
  if(nombreCorregido!=""){
    sheetFormato.getRange(rowFormato, 3).setValue(nombreCorregido);
    sheetActivos.getRange(indice, 5).setValue("tiquek nombre pendiente")
  }
  else{
    sheetFormato.getRange(rowFormato, 3).setValue(sheetActivos.getRange(indice, 3).getValue());
    sheetActivos.getRange(indice, 5).setValue("");
  }
  //cargar telefono
  var telCorregido =sheetActivos.getRange(indice, 7).getValue();
  if(telCorregido!=""){
    sheetFormato.getRange(rowFormato, 8).setValue(telCorregido);
    sheetActivos.getRange(indice, 8).setValue("ajustar cuentame")
  }
  else{
    sheetFormato.getRange(rowFormato, 8).setValue(sheetActivos.getRange(indice, 6).getValue());
    sheetActivos.getRange(indice, 8).setValue("");
  }
  
  
  
  //cargar resto de datos
  for(var iter= 4; iter<=7;iter++ ){
    sheetFormato.getRange(rowFormato, iter).setValue(sheetActivos.getRange(indice, iter+10).getValue());
  }
  for(var iter= 11; iter<=21;iter++ ){
    sheetFormato.getRange(rowFormato, iter).setValue(sheetActivos.getRange(indice, iter+10).getValue());
  }
  for(var iter= 23; iter<=35;iter++ ){
    sheetFormato.getRange(rowFormato, iter).setValue(sheetActivos.getRange(indice, iter+10).getValue());
  }
  
}

function onOpen(){
  var file =SpreadsheetApp.getActiveSpreadsheet();
  var sheetFormato = file.getSheetByName("FORMATO");
  sheetFormato.activate();
  sheetFormato.setActiveRange(sheetFormato.getRange("H6"));
}



function updateListDinamic(){
  var file =SpreadsheetApp.getActiveSpreadsheet();
  var sheetListado = file.getSheetByName("listado");
  var sheetActivos = file.getSheetByName("activos");
  
  var row =4;
  var col =0;
  var rowLista=1;
  
  do{
    
    var codeUDS =sheetActivos.getRange(row, 1).getValue();
    var idNino =sheetActivos.getRange(row, 2).getValue();
    
    
    if(codeUDS!=sheetActivos.getRange(row-1, 1).getValue()){
      col++;
      rowLista=1;
      sheetListado.getRange(rowLista, col).setValue(codeUDS);
      rowLista=3;
      sheetListado.getRange(rowLista, col).setValue(idNino);
      rowLista++;
      row++;
    }
    else{
      sheetListado.getRange(rowLista, col).setValue(idNino);
      rowLista++;
      row++;
    }
    
    
  }
  while(sheetActivos.getRange(row+1, 1)!="");
  
  
  
  
  
}
function test(){
  var file =SpreadsheetApp.openById("1nDbz-1LotaaVx6RKOJBtSRmFjtGnZzQNAF_gAqWaJ5o");
  var sheetFormato = file.getSheetByName("FORMATO");
  sheetFormato.deleteRows(26, 974);//874
    var sheetActivos = file.getSheetByName("activos");
  
  for(var i=244;i<=292;i++){
  sheetActivos.getRange(i, 21).setValue(""); //llamada efectiva
  }
  
    for(var c=7;c<=20;c++){
      sheetActivos.getRange(245, c).setValue("");
    }
}