import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const username = process.env.GMAIL_USERNAME;
const password = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: username,
    pass: password,
  },
});

export const sendEmail = async (body: any) => {
  let mainUserHtml: string = "";
  let totalAllUsersBill: number = 0;
  body.orders.forEach((order: any) => {
    order.invitedUsers.forEach(async (user: any) => {
      const html = `<div class="container" style="max-width: 1000px; margin-left: auto; margin-right: auto; padding-left: 10px; padding-right:10px;" >
      <ul class="responsive-table">
        <h2 style="font-weight: 500; margin: 16px" >Charges of: ${
          body.user.fullName
        }, ${body.user.email}  Date: ${new Date().toDateString()}</h2>
        <li class="table-header" style="border-radius: 3px; padding: 25px 30px; display: flex; justify-content: space-between; margin-bottom: 25px; background-color: #95A5A6; font-size: 14px; text-transform: uppercase; letter-spacing: 0.03em;" >
          <div class="col col-1" style="width: 10%;">No.</div>
          <div class="col col-2" style="width: 40%;" >Name</div>
          <div class="col col-3" style="width: 25%;" >Price</div>
          <div class="col col-4" style="width: 25%;" >Quantity</div>
        </li>
        ${user.orders.map(
          (item: any, index: number) =>
            `<li class="table-row" style="border-radius: 3px; padding: 0px 30px; display: flex; justify-content: space-between; margin-bottom: 25px; background-color: #ffffff; box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);" >
              <div class="col col-1" style="width: 10%;" data-label="Job Id">${index}</div>
              <div class="col col-2" style="width: 40%;"  data-label="Customer Name">${item.name}</div>
              <div class="col col-3" style="width: 25%;"  data-label="Amount">${item.price}</div>
              <div class="col col-4" style="width: 25%;"  data-label="Payment Status">${item.quantity}</div>
            </li>`
        )}
        </li>
        <h2 style="font-weight: 500; margin: 16px" >Total charges: ${
          user.userCharges
        } PKR</h2>
      </ul>
    </div>`;

      const htmlMain = `<div class="container" style="max-width: 1000px; margin-left: auto; margin-right: auto; padding-left: 10px; padding-right:10px;" >
      <ul class="responsive-table">
        <h2 style="font-weight: 500; margin: 16px" >Bill details of: ${
          user.userName
        }, ${user.userEmail}  Date: ${new Date().toDateString()}</h2>
        <li class="table-header" style="border-radius: 3px; padding: 25px 30px; display: flex; justify-content: space-between; margin-bottom: 25px; background-color: #95A5A6; font-size: 14px; text-transform: uppercase; letter-spacing: 0.03em;" >
          <div class="col col-1" style="width: 10%;">No.</div>
          <div class="col col-2" style="width: 40%;" >Name</div>
          <div class="col col-3" style="width: 25%;" >Price</div>
          <div class="col col-4" style="width: 25%;" >Quantity</div>
        </li>
        ${user.orders.map(
          (item: any, index: number) =>
            `<li class="table-row" style="border-radius: 3px; padding: 0px 30px; display: flex; justify-content: space-between; margin-bottom: 25px; background-color: #ffffff; box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);" >
              <div class="col col-1" style="width: 10%;" data-label="Job Id">${index}</div>
              <div class="col col-2" style="width: 40%;"  data-label="Customer Name">${item.name}</div>
              <div class="col col-3" style="width: 25%;"  data-label="Amount">${item.price}</div>
              <div class="col col-4" style="width: 25%;"  data-label="Payment Status">${item.quantity}</div>
            </li>`
        )}
        </li>
        <h2 style="font-weight: 500; margin: 16px" >Total charges: ${
          user.userCharges
        } PKR</h2>
      </ul>
    </div>`;

      mainUserHtml += htmlMain;
      totalAllUsersBill += user.userCharges;

      const info = await transporter.sendMail({
        to: user.userEmail,
        subject: "Order Details",
        html,
      });
      console.log(`Email sent to ${user.userEmail}, `, info.response);
    });
  });

  mainUserHtml += `<h2 style="font-weight: 500;margin: 16px;border-top: 1px solid grey;margin-left: 21rem;padding: 10px;margin-top: 3rem;" >All User Total Charges: ${totalAllUsersBill} PKR</h2>`;

  const info = await transporter.sendMail({
    to: body.user.email,
    subject: "Order Details",
    html: mainUserHtml,
  });
  console.log(`Email sent to ${body.user.email}, `, info.response);
};
