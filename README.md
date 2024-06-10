# เว็บ To-Do List

แอปพลิเคชันนี้ช่วยให้ผู้ใช้งานจัดการกับงานที่ต้องทำได้อย่างง่าย

## Language&Framework

- Language: TypeScript, HTML, CSS
- Framework: ReactTS(Vite)
- UI Component: ReactBootstrap, sweetalert2

## Navbar

เมื่อผู้ใช้งานเปิดหน้าหลัก จะมี Navbar ปรากฏที่ด้านบนของหน้าเว็บ ซึ่งช่วยให้ผู้ใช้งานแยกแยะงานที่เสร็จแล้วและยังไม่เสร็จได้อย่างชัดเจน นอกจากนี้ยังแสดงจำนวนงานทั้งหมดที่ผู้ใช้งานมีอยู่ ถ้าไม่มีงานที่เหลือเลย จะแสดงข้อความ "Do you have 0 task left"

## เพิ่มงาน

ผู้ใช้งานสามารถเพิ่มงานได้โดยการคลิกที่ปุ่ม "เพิ่มงาน" หลังจากนั้น จะมีหน้าต่างปรากฏขึ้นมาเพื่อให้ผู้ใช้งานกรอกข้อมูลเกี่ยวกับงาน เช่น ชื่องาน, รายละเอียด, และวันที่ต้องเสร็จ หากผู้ใช้งานพยายามเพิ่มงานโดยไม่กรอกข้อมูลทุกฟิลด์ที่จำเป็น ระบบจะแสดงการแจ้งเตือนที่บอกว่าข้อมูลในฟิลด์ไหนที่ยังว่าง เมื่อผู้ใช้งานกรอกข้อมูลครบทุกฟิลด์และคลิกที่ "เพิ่มงาน" ระบบจะเพิ่มงานลงในหน้าเว็บเป็น "การ์ดงาน" ข้อมูลงานจะถูกเก็บไว้ใน local storage ของผู้ใช้งาน

## Card Task

ในการแสดงผลงานในหน้าเว็บเมื่อเพิ่มงานเสร็จแล้วระบบจะแสดงงานออกมาเป็น Card Task ซึ่งจะแสดงชื่องาน, รายละเอียดของงานและวันที่ หากข้อมูลรายละเอียดงานมีความยาวเกิน 200 ตัวอักษร ระบบจะทำการตัดและแสดงเพียง 200 ตัวอักษรเท่านั้น หากต้องการดูรายละเอียดเพิ่มเติมผู้ใช้งานสามารถคลิกที่ Card Task นั้น เพื่อแสดงหน้าต่างที่แสดงรายละเอียดงานทั้งหมดที่ผู้ใช้งานกรอกเข้ามารวมถึงชื่อและวันที่ด้วย เเละยังสามารถลาก card เพื่อเปลี่ยนตำแหน่งได้โดยกดค้างที่ card เเล้วลากเพื่อเปลี่ยนตำแหน่งได้เลย

## การแก้ไขและการลบงาน

สำหรับการแก้ไขงาน จะมีปุ่ม "Edit" ให้คลิก เมื่อคลิกแล้วจะมีหน้าต่างปรากฏขึ้นมาเพื่อให้ผู้ใช้แก้ไขรายละเอียดต่างๆได้ หากคุณพยายามเพิ่มงานโดยไม่กรอกข้อมูลทุกฟิลด์ที่จำเป็น ระบบจะแสดงการแจ้งเตือนที่บอกว่าข้อมูลในฟิลด์ไหนที่ยังว่าง เมื่อคุณกรอกข้อมูลครบทุกฟิลด์และคลิกที่ "บันทึก" ระบบจะทำการอัปเดตค่าที่ผู้ใช้งานแก้ไขและแสดงที่หน้าเว็บทันที

สำหรับปุ่ม "Delete" เมื่อคลิกแล้วจะมีการแจ้งเตือนขึ้นมาเพื่อถามผู้ใช้ว่าต้องการลบจริงๆใช่ไหม หากคลิก "yes" ระบบจะทำการลบงานนั้นออกจากระบบทันที

ใน card task จะมี checkbox เมื่อคลิกแล้วงานนั้นจะกลายเป็นงานที่ดำเนินการเสร็จแล้วและจะถูกเพิ่มไปยังรายการงานที่เสร็จแล้ว

# To-Do Application

This application helps you manage your tasks easily.

## Navbar

When you open the main page, there will be a Navbar displayed at the top of the webpage, allowing you to differentiate between completed and pending tasks clearly. Additionally, it shows the total number of tasks you have. If there are no tasks remaining, it will display the message "You have 0 tasks to do."

## Add Task

You can add tasks by clicking on the "Add Task" button. After that, a window will appear prompting you to fill in details about the task, such as its name, description, and due date. If you try to add a task without filling in all the necessary fields, the system will display a notification indicating which fields are empty. Once you've filled in all the fields and clicked "Add Task," the system will add the task to the webpage as a "Task Card," and the task details will be stored in the user's local storage.

## Task Cards

When displaying tasks on the webpage after they have been added, the system presents them as Task Cards. These cards show the task name, description, and due date. If the task description exceeds 200 characters, the system will truncate it and display only the first 200 characters. If users want to view additional details, they can click on the Task Card to open a window displaying all the details provided by the user, including the name and date.

## Editing and Deleting Tasks

For editing tasks, there is an "Edit" button to click on. When clicked, a window will appear allowing users to edit various details. If you try to add a task without filling in all the necessary fields, the system will display a notification indicating which fields are empty. Once you've filled in all the fields and clicked "Save," the system will update the edited values and display them on the webpage immediately.

For the "Delete" button, when clicked, a confirmation prompt will appear asking users if they really want to delete the task. If the user clicks "yes," the system will delete the task immediately.

In each Task Card, there is a checkbox. When clicked, the task will be marked as completed and added to the list of completed tasks.
