import smtplib, ssl

def sendEmail(x):

    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "*************@gmail.com"  # Enter your address
    receiver_email = "************@gmail.com"  # Enter receiver address
    password = "***********" # Enter your password
    message = """\
    """ +x+ """

      """ +x+ """ 
      """

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)


        