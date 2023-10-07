
import jsPDF from "jspdf";

import { Get_font_pdf_th, Get_font_pdf_th2 } from "../../assets/font/pdf_font";
import Configs from "../../config";
import { getOem, getToken, getUser, getFeature, getComConfig } from "../../Utils/Common";
import moment from "moment";
//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function self_pickup_report(company, addressOEM, data, date, oem, Oemlist) {
  var oem_target = addressOEM.filter((e)=>{ 
    return e.oem_id === oem;
  })
  var name_full = "";
  var name_oem_id = "";
console.log(data)
  if (oem_target[0].oem_name === "บริษัท สตูลค้าเหล็ก จำกัด") {
  
    name_full ="บริษัท สตูลค้าเหล็ก จำกัด";
    name_oem_id = "SST";
  }else if (oem_target[0].oem_name === "บริษัท เอสทีสตีล(2001) จำกัด") {
  
    name_full ="บริษัท เอสทีสตีล(2001) จำกัด";
    name_oem_id = "STS";
  }else if (oem_target[0].oem_name === "บริษัท เอสทีสตีล(2001) ปัตตานี จำกัด") {
  
    name_full ="บริษัท เอสทีสตีล(2001) ปัตตานี จำกัด";
    name_oem_id = "STP";
  }else if (oem_target[0].oem_name === "บริษัท เอสที คอนกรีตโปรดักส์ จำกัด") {
  
    name_full ="บริษัท เอสที คอนกรีตโปรดักส์ จำกัด";
    name_oem_id = "STC";
  }else if (oem_target[0].oem_name === "บริษัท เอสทีซีวิล(2001) จำกัด") {
  
    name_full ="บริษัท เอสทีซีวิล(2001) จำกัด";
    name_oem_id = "ST CIVIL";
  }

 
/*   console.log(";;",data) */
var now = 0
var nameall = [];
for (let index = 0; index < data.length; index ++) {

  if (data[index].nameall) {
    
  }
  nameall = data[index].nameall || ""
  now = now+1
}

/* console.log(nameall,"ss") */

  
  const doc = new jsPDF("l", "mm", "a4");
  var oem_target = addressOEM.filter((e) => {
    return e.oem_id === oem;
  })
  var part_oem = Oemlist.filter((e2) => { return e2.id === oem; })
 
/*   console.log("ข้อมูล",data); */

  var y = 0;
  var sum_value = 0;
  var sum_weight = 0;
  var counts = 0;
  for (let index = 0; index < data.length; index = index + 20) {

    

  doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
  doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
  doc.addFont('Rocki', 'bold');
  doc.setFont("THSarabunNew");
  doc.setFontSize(12)

  //logo

  var Com_logo = `${Configs.API_URL_IMG + part_oem[0].logo_path}`;
  doc.addImage(Com_logo, 'JPEG', 10, 5, 30, 30)







 

  doc.text(112, 42, moment(date).add('year', 543).format('DD/MM/yyyy').toString(), "center")




  doc.text(48, 15, oem_target[0].oem_name.toString())


  doc.text(48, 19, oem_target[0].address.toString())


   
  doc.setFontSize(18); 
  //////////////////////////////////////////////
  doc.text(102, 30, " รายงานการตรวจสอบสินค้า(รับเอง)ประจำวัน");
  /* doc.setFontSize(15)
  doc.text(230, 40, name_oem_id+" รายงานการตรวจสอบประจำวัน"); */


  doc.setFontSize(12)
 
  ///////////////////////////////////
  doc.text(9, 42, "ฝ่ายตรวจสอบ");
 


  doc.setFont("THSarabunNew");
  doc.text(46, 42, "ผู้รับผิดชอบ");
  doc.text(96, 42, "วันที่");

  //หัวข้อตาราง
  doc.rect(8, 44, 11, 14);
  doc.text(13, 52, "ลำดับ", "center");

  doc.rect(19, 44, 21, 14);
  doc.text(29.5, 52, "เลขที่บิล", "center");

  doc.rect(40, 44, 64, 14);
  doc.text(72.5, 52, "รายการ", "center");

  doc.rect(104, 44, 18, 14);
  doc.text(113, 52, "มูลค่า", "center");

  doc.rect(122, 44, 68, 14);
  doc.text(156, 52, "ลูกค้า", "center");

  doc.rect(190, 44, 22, 14);
  doc.text(201, 52, "ผู้จัดสินค้า", "center");

  doc.rect(212, 44, 22, 14);
  doc.text(223, 52, "ผู้ตรวจสินค้า", "center");

  doc.rect(234, 44, 18, 14);
  doc.text(243, 52, "เวลา", "center");

  doc.rect(8, 44, 281, 14);
  doc.text(269, 52, "หมายเหตุ", "center");
  //กรอบล่างตาราง



  var ur = 0
 
 
  var num = 14;
  var row = 0;
 


  for (let i = 0; row < 20 ; i = i + 20) {
    var allremark = "";
    var allproduct_and_category = "";
    var bill_no = "";
    var product_and_category = "";
    var bill_values = "";
    var customer_name = "";
    var bill_destination = "";
    var person_receive = "";
    var person_sent = "";
    var time_receive = "";
    var remark_receive = "";
    var approve_bill = "";

    if (!data[index+row]) {
  
      doc.rect(8, 44+ num, 11, 7);

    
      doc.rect(19, 44+ num, 21, 7);
     
    
      doc.rect(40, 44+ num, 64, 7);
      
    
      doc.rect(104, 44+ num, 18, 7);
      
    
      doc.rect(122, 44+ num, 68, 7);
     
    
      doc.rect(190, 44+ num, 22, 7);
     
    
      doc.rect(212, 44+ num, 22, 7);
    
    
      doc.rect(234, 44+ num, 18, 7);

    
      doc.rect(8, 44+ num, 281, 7);
    
    }else{
      bill_no = data[index+row].bill_no
      if(data[index+row].product_and_category && data[index+row].product_and_category.length > 0){
        for(let i =0; i < data[index+row].product_and_category.length;i++  /* of data[index+row].product_and_category1 || "" */){
          if(i+1 === data[index+row].product_and_category.length ){
            product_and_category += data[index+row].product_and_category[i].label;
          }else{
            product_and_category += data[index+row].product_and_category[i].label+ ",";
          }
         
        }
      }
      if (data[index+row].bill_values !== ""   ) {
        bill_values = parseFloat(data[index+row].bill_values || 0);
      }
      sum_value = sum_value + parseFloat(bill_values);
      customer_name = data[index+row].customer_name || ""     
      bill_destination = data[index+row].bill_destination;
     /*  person_receive = data[index+row].person_receive || "" */
      person_sent = data[index+row].person_sent || ""
      approve_bill = data[index+row].approve_bill || ""
      
      if (data[index+row].time_receive === null) {
        time_receive = ""
      } else {
        time_receive = moment(data[index+row].time_receive).format('HH:mm น');
      
      }
   
      remark_receive = data[index+row].remark_receive || ""
        
      for (let i = 0; i < remark_receive.length; i++) {
        if (i <23) {
          allremark += remark_receive[i]
        } else 
        if (i == 24) {
          allremark += "..."
        }
  
      }
      for (let i = 0; i < product_and_category.length; i++) {
        if (i <40) {
          allproduct_and_category += product_and_category[i]
        } else 
        if (i == 41) {
          allproduct_and_category += "..."
        }
  
      }
      console.log(allremark)

      doc.rect(8, 44+ num, 11, 7);
      doc.text(13, 49+ num, ((index+row)+1).toString(), "center");
    
      doc.rect(19, 44+ num, 21, 7);
      doc.text(29.5, 49+ num, bill_no.toString(), "center");
    
      doc.rect(40, 44+ num, 64, 7);
      doc.text(72.5, 49+ num, allproduct_and_category.toString(), "center");
    
      doc.rect(104, 44+ num, 18, 7);
      doc.text(121, 49+ num, bill_values.toFixed(2)  .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), "right");
    
      doc.rect(122, 44+ num, 68, 7);
      doc.text(156, 49+ num, customer_name.toString(), "center");
    
      doc.rect(190, 44+ num, 22, 7);
      doc.text(201, 49+ num, person_sent.toString(), "center");
    
      doc.rect(212, 44+ num, 22, 7);
      doc.text(223, 49+ num, approve_bill.toString(), "center");
    
      doc.rect(234, 44+ num, 18, 7);
      doc.text(243, 49+ num, time_receive.toString(), "center");
    
      doc.rect(8, 44+ num, 281, 7);
      doc.text(269, 49+ num, allremark.toString(), "center");
    
    }
     
    
        num = num + 7;
        row = row+1;
        counts = data.length-20;
     
    
      }


  if (index <= counts)
      {  doc.addPage("l");}

  }


  doc.setDrawColor(255, 0, 0); 
  doc.setFillColor(255, 0, 0);
  doc.setFontSize(18)
    doc.rect(8, 44 + num, 281, 8,'FD');
    doc.setDrawColor(255, 0, 0); 
    doc.setFillColor(255, 0, 0);
    doc.rect(8, 44 + num, 32, 8,'FD');
    doc.setTextColor(255, 255, 255);
    doc.text(23.5, 49 + num,"สรุป", "center")
    doc.text(23.5, 49 + num,"สรุป", "center")
    doc.text(23.5, 49 + num,"สรุป", "center")
  
    doc.setFontSize(13)
    doc.setDrawColor(255, 0, 0); 
    doc.setFillColor(255, 255, 255);
    doc.rect(41, 44.7 + num, 40, 6.5,'FD');
  /*   doc.rect(82, 44.7 + num, 40, 6.5,'FD'); */
   
    doc.setTextColor(0, 0, 0);
   /*  doc.text(60,  63 + num,"รวมจำนวนเที่ยว "+y+" เที่ยว", "center")
    doc.text(60,  63 + num,"รวมจำนวนเที่ยว "+y+" เที่ยว", "center") */
    if (sum_value !== NaN) {
    doc.text(60,  49 + num,"รวมจำนวนบิล "+data.length.toString()+" บิล", "center")
    doc.text(60,  49 + num,"รวมจำนวนบิล "+data.length.toString()+" บิล", "center")
  
  }else{
    doc.text(60,  49 + num,"รวมจำนวนบิล "+"0"+" บิล", "center")
    doc.text(60,  49 + num,"รวมจำนวนบิล "+"0"+" บิล", "center")
  }

    doc.setDrawColor(255, 255, 255); 
    doc.setFillColor(255, 255, 255);
    doc.rect(82, 44.7 + num, 40, 6.5,'FD');
    if (sum_value !== NaN) {
      doc.text(102,  49 + num,"รวมมูลค่า "+sum_value.toFixed(2)  .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" บาท", "center")
      doc.text(102,  49 + num,"รวมมูลค่า "+sum_value.toFixed(2)  .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" บาท", "center")
    }else{
      doc.text(102,  49 + num,"รวมมูลค่า "+"0"+" บาท", "center")
      doc.text(102,  49 + num,"รวมมูลค่า "+"0"+" บาท", "center")
    }
/*   doc.setProperties({
    title: "This is my title"
}); */

  window.open(doc.output('bloburl'));


}


export default self_pickup_report;
