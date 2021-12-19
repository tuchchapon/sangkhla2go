import React from 'react'
import Header from './Header'
export default function video() {
    return (
        <div>
            <Header  />
           

โปรแกรมเล่นวิดีโอถ่ายทอดสดและวิดีโอแบบฝัง
คุณสามารถเพิ่มวิดีโอ Facebook และวิดีโอถ่ายทอดสด Facebook ไปยังเว็บไซต์ของคุณได้อย่างง่ายดายด้วยโปรแกรมเล่นวิดีโอแบบฝัง คุณสามารถใช้โพสต์แบบวิดีโอสาธารณะของเพจหรือบุคคลใดก็ได้เป็นแหล่งที่มาของวิดีโอหรือวิดีโอถ่ายทอดสด

ตัวกำหนดค่าโปรแกรมเล่นวิดีโอแบบฝังตัวอย่างโค้ดการตั้งค่าเพิ่มโค้ดด้วยตนเอง
วิธีการทีละขั้นตอน
1. เลือก URL หรือเพจ
เลือก URL หรือวิดีโอ Facebook ที่คุณต้องการฝัง

2. ตัวกำหนดค่าโค้ด
วาง URL ที่ ตัวกำหนดค่าโค้ด และคลิกที่ปุ่ม “รับโค้ด” เพื่อสร้างโค้ดของโปรแกรมเล่นวิดีโอแบบฝังของคุณ

3. คัดลอกแล้ววางส่วนย่อย HTML
คัดลอกแล้ววางส่วนย่อยลงใน HTML ของเว็บไซต์ปลายทาง

ตัวกำหนดค่าโปรแกรมเล่นวิดีโอแบบฝัง
URL ของวิดีโอ
http://www2.edtguide.com/index.php/www/review/468268/Sangkhlaburi 
ความกว้างของวิดีโอในหน่วยพิกเซล
500
 รวมโพสต์ฉบับเต็มด้วย

รับรหัส
ตัวอย่างโค้ดแบบเต็ม
คัดลอกแล้ววางตัวอย่างโค้ดลงในเว็บไซต์ของคุณ ปรับเปลี่ยนค่า data-href ให้กับ URL วิดีโอของคุณ ควบคุมขนาดของโปรแกรมเล่นโดยใช้แอตทริบิวต์ data-width

<div id="fb-root"></div>
  <script async defer src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"></script>
  <iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FEDTguide%2Fvideos%2F401258017707565%2F&show_text=true&width=560&t=0" width="560" height="429" style={{border:'none',overflow:'hidden'}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
  {/* <!-- Your embedded video player code --> */}
  <div class="fb-video" data-href="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FEDTguide%2Fvideos%2F401258017707565%2F&show_text=false&width=560&t=0" data-width="500" data-show-text="false">
    <div class="fb-xfbml-parse-ignore">
      <blockquote cite="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FEDTguide%2Fvideos%2F401258017707565%2F&show_text=false&width=560&t=0">
        <a href="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FEDTguide%2Fvideos%2F401258017707565%2F&show_text=false&width=560&t=0">How to Share With Just Friends</a>
        <p>How to share with just friends.</p>
        Posted by <a href="https://www.facebook.com/facebook/">Facebook</a> on Friday, December 5, 2014
      </blockquote>
    </div>
  </div>
        </div>
    )
}
