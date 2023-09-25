
import jsPDF from "jspdf";
import { Get_font_pdf } from "../../assets/font/pdf_font";
import Configs from "../../config";
import { getOem, getToken, getUser, getFeature, getAcademy, getComConfig} from "../../Utils/Common";
import moment from "moment";
import QRCode2 from "qrcode";
//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function product_qr_report(reportdata,company,oem_data) {
console.log(company,oem_data)

var Com_logo = `${Configs.API_URL_IMG + company.logo_path}`;
var OEM_logo = `${Configs.API_URL_IMG + oem_data.logo_path}`;
var prod_img = `${Configs.API_URL_IMG}`;
var com_chackname =  getComConfig().com_name
    const doc = new jsPDF("p", "mm", "a4");
    console.log(reportdata)
   var counts = 0;
   for (let index = 0; index < reportdata.length; index = index + 8) {
     
    doc.addFileToVFS("ROCK.TTF", Get_font_pdf());
    doc.addFont("ROCK.TTF", "Rocki", "normal");
    doc.setFont("Rocki");
    doc.setFont("THSarabunNew");
  
  doc.setDrawColor(0);
      doc.setFillColor("#272727");
      doc.rect(0, 0, 1080, 31, "F");

      doc.addImage(Com_logo, "JPEG", 1, 1, 29, 29);
      doc.addImage(OEM_logo, "JPEG", 180, 1, 29, 29);
 
      doc.setTextColor(255, 255, 255);
      
     if (com_chackname === "Central Spring co., Ltd.") {
      doc.setFontSize(30);
      doc.text(105, 20, "CENTRAL SPRING PART LIST", "center");
     } else {
      doc.setFontSize(40);
      doc.text(105, 20, "SHIMIZU PART LIST", "center");
     }


 
  var row = 0;
 
  
  
  for (let i = 0; row < 8 ; i = i + 8) {

   var  x = 0
   var  y = 0
   let img_qr = "";

    if (!reportdata[index+row]) {


  }else{
  
  
    if (row === 1) {
        x = 104.5
        y = 0
    }
    if (row === 2) {
        x = 0
        y = 60
    }
    if (row === 3) {
        x = 104.5
        y = 60
    }
    if (row === 4) {
        x = 0
        y = 120
    }
    if (row === 5) {
        x = 104.5
        y = 120
    }
    if (row === 6) {
        x = 0
        y = 180
    }
    if (row === 7) {
        x = 104.5
        y = 180
    }
    doc.setDrawColor(0, 0, 0);
    QRCode2.toDataURL(
        reportdata[index+row].no.toString(),
        function (err, url) {
          img_qr = url;
        }
      );
      doc.addImage(img_qr, "JPEG", 15+x, 32+y, 40, 40);

      doc.addImage(
        prod_img + reportdata[index+row].imaget_path,
        "JPEG",
        56+x,
        37+y,
        30,
        30
      );
      doc.rect(56+x, 37+y, 30, 30);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.addFont("Rocki", "bold");
      doc.setFont("Rocki");
      doc.text(15+x, 73+y, "Product No.");

      doc.setTextColor(255, 0, 0);
      doc.setFontSize(34);
      doc.addFont("Rocki", "bold");
      doc.setFont("Rocki");
      doc.text(52.25+x, 82+y, reportdata[index+row].no, "center");

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9.3);
      //doc.addFont('Rocki', 'normal');
      //doc.setFont('Rocki');
      doc.text(52.25+x, 88+y, "Product Name. : " + reportdata[index+row].name, "center");

      doc.setDrawColor(192, 192, 192);
      doc.rect(0+x, 32+y, 105, 60);
    }

    //box 2
   
    

    row = row+1;
    counts = reportdata.length-8;


   
  }


     
            if (index < counts)
            {  doc.addPage("l");}

}



  window.open(doc.output('bloburl'));

  
}


export default product_qr_report;
