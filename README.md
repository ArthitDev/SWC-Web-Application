# Smart Wound Care Application
เว็บแอปพลิเคชันให้คำแนะนำในการดูแลแผลอัจฉริยะ

ลิงก์ไปยังเว็บไซต์ : https://smartwoundcare.site

## การติดตั้ง & การใช้งาน

### ขั้นตอนในการติดตั้ง:

1. ดาวน์โหลด หรือ clone โปรเจกต์ และ แตกไฟล์
2. จากนั้นใช้คำสั่ง `cd SWC-Web-Application-feat-ready-deploy` เพื่อเข้าไปในโฟลเดอร์หลัก
3. รันคำสั่ง `npm install` & `yarn install` เพื่อติดตั้ง dependencies
4. ตรวจสอบให้แน่ใจว่า dependencies ทั้งหมดได้รับการติดตั้งเรียบร้อยแล้วก่อนดำเนินการต่อ

### การใช้งาน

คำสั่งในการรันโครงการ:

- รันคำสั่ง `npm start` หรือ `yarn start` เพื่อเริ่มต้นการทำงานของแอปพลิเคชัน
- หลังจากนั้นสามารถเข้าถึงแอปพลิเคชันได้ผ่านเบราว์เซอร์ที่ `http://localhost:3900` (หรือพอร์ตที่ตั้งค่าไว้ในโปรเจกต์)

---

## คุณสมบัติของแอปพลิเคชัน

- **มีข้อมูลแผล ,บทความ ,รู้หริอไม่ , เคล็ดไม่ลับ** 
- **จัดการข้อมูล : ข้อมูลแผล ,บทความ ,รู้หริอไม่ , เคล็ดไม่ลับ**
- **อัปโหลดรูปภาพเพื่อวิเคราะห์ภาพแผล AI**

## การตรวจสอบประเภทตัวแปร และ กฏการเขียนโค้ดแบบ esllint

- ใช้คำสั่ง `npm lint` สำหรับตรวจสอบการเขียนโค้ดตามรูปแบบ eslint
- ใช้คำสั่ง `npm check-types` สำหรับตรวจสอบประเภทตัวแปร
---

## ข้อมูลเพิ่มเติม

หากต้องการปรับแต่งแอปพลิเคชันเพิ่มเติม เช่น เปลี่ยนพอร์ต หรือการตั้งค่า API สามารถทำได้ในไฟล์ `.env.local` หรือไฟล์การตั้งค่าต่าง ๆ ที่เกี่ยวข้อง
