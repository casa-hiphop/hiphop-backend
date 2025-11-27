import nodemailer, { type Transporter } from "nodemailer"
import { env } from "../../../env/environments"
import type { IMailProps } from "../MailProvider.interface"

class MailProvider {
  private readonly client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secureConnection: env.MAIL_SECURITY,
      requireTLS: true,
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
      logger: true,
      debug: true,
    })
  }

  async sendMail({ to, subject, template }: IMailProps) {
    await this.client.sendMail({
      from: env.MAIL_FROM,
      to,
      subject,
      html: template,
    })
  }
}

export { MailProvider }
