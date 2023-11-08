console.log("Hey, I love coffee");
//let viz = new tableau.Viz(placeholderDiv, url, options);
let viz;

//Creating variables to store the Tableau Viz
let placeholderDiv = document.getElementById("tableauViz");
//Create variable to store URL
let url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-US&:display_count=n&:origin=viz_share_link";
//Create variable to give viz options
let options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};

function intViz() {
  console.log("Viz is ready");

  viz = new tableau.Viz(placeholderDiv, url, options);
}
// Listen to the content being loaded when finished load the viz
document.addEventListener("DOMContentLoaded", intViz);

//Find our buttons in the html file
let exportPdfbuttton = document.getElementById("exportPdf");

let ExportPPT = document.getElementById("ExportPPT");

let filterValueButton = document.getElementById("FilterButton");

//Listen for a click
exportPdfbuttton.addEventListener("click", exportPDFfunction);
ExportPPT.addEventListener("click", exportPPTfunction);
filterValueButton.addEventListener("click", getRangeValues);

//Function when button is clicked
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}
//Get range value
function getRangeValues() {
  const minValue = document.getElementById("Min Value").value;
  const maxValue = document.getElementById("Max Value").value;
  console.log(minValue, maxValue);

  const workbook = viz.getWorkbook();
  console.log(workbook);
  let activeSheet = workbook.getActiveSheet();
  let sheets = activeSheet.getWorksheets();
  console.log(sheets);
  let sheetToFilter = sheets[0];
  console.log(sheetToFilter);

  //Do the filtering

  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue }, { max: maxValue })
    .then(alert("Viz filtered"));
}

//Create filterValuesFunction
