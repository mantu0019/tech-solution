export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHTML(otp) {
  const digits = String(otp).split("");

  const otpTiles = digits
    .map(
      (digit) => `
        <td style="padding:0 5px;">
          <div style="
            width:43px;
            height:52px;
            background:#F5F1E8;
            border:1px solid #E5DED1;
            border-radius:8px;
            color:#111111;
            font-size:25px;
            font-weight:700;
            font-family:'Courier New',monospace;
            text-align:center;
            line-height:52px;
          ">
            ${digit}
          </div>
        </td>
      `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechSolution - Email Verification</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#F5F3EE;
  font-family:Arial,Helvetica,sans-serif;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="background:#F5F3EE;padding:40px 12px;"
  >

    <tr>
      <td align="center">

        <!-- Main Card -->
        <table
          width="560"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            max-width:560px;
            width:100%;
            background:#FFFFFF;
            border-radius:12px;
            overflow:hidden;
            border:1px solid #EAE7DF;
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                background:#111111;
                padding:35px 20px;
              "
            >

              <div style="
                font-size:30px;
                font-weight:800;
                letter-spacing:-1px;
                color:#FFFFFF;
              ">
                Tech<span style="color:#C8BDAA;">Solution</span>
              </div>

              <p style="
                margin:10px 0 0;
                color:#BDB8AE;
                font-size:10px;
                letter-spacing:3px;
                text-transform:uppercase;
              ">
                Technology · Innovation · Solutions
              </p>

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 25px 20px;">

              <!-- Icon -->
              <div style="
                width:58px;
                height:58px;
                line-height:58px;
                margin:0 auto 22px;
                text-align:center;
                border-radius:12px;
                background:#F5F1E8;
                font-size:27px;
              ">
                &#128274;
              </div>

              <!-- Heading -->
              <h1 style="
                margin:0 0 14px;
                text-align:center;
                color:#111111;
                font-size:25px;
                font-weight:700;
                letter-spacing:-0.5px;
              ">
                Verify Your Email
              </h1>

              <!-- Description -->
              <p style="
                margin:0 auto 30px;
                max-width:390px;
                text-align:center;
                color:#77736B;
                font-size:14px;
                line-height:24px;
              ">
                Welcome to TechSolution! We're glad to have you
                on board. Enter the verification code below
                to confirm your email address.
              </p>

              <!-- OTP -->
              <table
                align="center"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="margin:0 auto 28px;"
              >
                <tr>
                  ${otpTiles}
                </tr>
              </table>

              <!-- Expiry -->
              <table
                align="center"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="margin:0 auto 30px;"
              >
                <tr>
                  <td style="
                    background:#F5F1E8;
                    border:1px solid #EAE2D5;
                    border-radius:30px;
                    padding:10px 18px;
                    color:#49443B;
                    font-size:12px;
                    font-weight:600;
                  ">
                    &#9201; &nbsp; Valid for 10 minutes
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="
                height:1px;
                background:#EFEDE8;
                margin:0 0 25px;
              "></div>

              <!-- Security Notice -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                  background:#F9F7F2;
                  border-left:3px solid #B8AA91;
                  border-radius:5px;
                  margin-bottom:25px;
                "
              >
                <tr>
                  <td style="padding:17px;">

                    <p style="
                      margin:0 0 8px;
                      color:#171717;
                      font-size:13px;
                      font-weight:700;
                    ">
                      Security Reminder
                    </p>

                    <p style="
                      margin:0;
                      color:#77736B;
                      font-size:12px;
                      line-height:21px;
                    ">
                      Never share your verification code with anyone.
                      Our team will never ask you for your OTP.
                      Keep your account credentials secure.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Ignore Message -->
              <p style="
                margin:0 0 15px;
                text-align:center;
                color:#99958D;
                font-size:12px;
                line-height:21px;
              ">
                If you didn't request this verification code,
                you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                background:#F9F8F5;
                border-top:1px solid #EAE7DF;
                padding:27px 15px;
              "
            >

              <p style="
                margin:0 0 8px;
                color:#77736B;
                font-size:12px;
              ">
                Building better digital experiences.
              </p>

              <p style="
                margin:0;
                color:#111111;
                font-size:19px;
                font-weight:800;
                letter-spacing:-0.5px;
              ">
                Tech<span style="color:#A99B84;">Solution</span>
              </p>

              <p style="
                margin:16px 0 0;
                color:#A5A198;
                font-size:11px;
                line-height:19px;
              ">
                This is an automated email. Please do not reply.
                <br>
                &copy; ${new Date().getFullYear()} TechSolution.
                All rights reserved.
              </p>

            </td>
          </tr>

        </table>

        <!-- Bottom Text -->
        <p style="
          margin:20px 0 0;
          color:#A5A198;
          font-size:11px;
          text-align:center;
          letter-spacing:0.3px;
        ">
          Secure. Simple. Reliable.
        </p>

      </td>
    </tr>

  </table>

</body>
</html>
`;
}
