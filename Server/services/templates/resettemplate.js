const resertemplate = (username, resetLink) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      }
      .header {
        background: #2563eb;
        padding: 20px;
        text-align: center;
        color: #fff;
        font-size: 22px;
        font-weight: bold;
      }
      .content {
        padding: 30px;
        color: #333;
        text-align: center;
      }
      .content h2 {
        margin-bottom: 10px;
      }
      .content p {
        font-size: 15px;
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        margin-top: 25px;
        padding: 14px 30px;
        background: #2563eb;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
      }
      .footer {
        padding: 15px;
        font-size: 12px;
        color: #777;
        text-align: center;
        background: #f9fafb;
      }
      @media (max-width: 600px) {
        .content {
          padding: 20px;
        }
        .btn {
          padding: 12px 24px;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        Password Reset
      </div>

      <div class="content">
        <h2>Hello ${username},</h2>
        <p>
          You requested to reset your password.  
          Click the button below to reset it.
        </p>

        <a href="${resetLink}" class="btn">
          Reset My Password
        </a>

        <p style="margin-top:20px;">
          If you did not request this, you can safely ignore this email.
        </p>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = resertemplate;
