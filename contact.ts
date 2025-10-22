import { Router } from "express";
import { z } from "zod";
import nodemailer from "nodemailer";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  facility: z.enum(["mirai", "hikari", "studio_m"]),
  inquiryType: z.enum(["visit", "trial", "consultation", "other"]),
  message: z.string().min(1),
});

// 各事業所のメールアドレス
const facilityEmails = {
  mirai: "mirai@mirai-network.jp",
  hikari: "hikari@mirai-network.jp",
  studio_m: "studio-m@mirai-network.jp",
};

const facilityLabels = {
  mirai: "MIRAI",
  hikari: "HIKARI",
  studio_m: "studio M",
};

const inquiryTypeLabels = {
  visit: "見学希望",
  trial: "体験希望",
  consultation: "利用相談",
  other: "その他",
};

router.post("/", async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);

    // メール送信設定（環境変数から取得）
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "mirainet2017@gmail.com",
        pass: process.env.SMTP_PASS || "",
      },
    });

    // 事業所へのメール
    const facilityEmail = facilityEmails[data.facility];
    const facilityLabel = facilityLabels[data.facility];
    const inquiryTypeLabel = inquiryTypeLabels[data.inquiryType];

    const mailOptions = {
      from: process.env.SMTP_USER || "mirainet2017@gmail.com",
      to: facilityEmail,
      subject: `【${facilityLabel}】お問い合わせ: ${inquiryTypeLabel}`,
      text: `
【お問い合わせ内容】

お名前: ${data.name}
メールアドレス: ${data.email}
電話番号: ${data.phone || "未入力"}
お問い合わせ先: ${facilityLabel}
お問い合わせ内容: ${inquiryTypeLabel}

メッセージ:
${data.message}

---
このメールは未来ネットワークのWebサイトから送信されました。
      `.trim(),
      html: `
        <h2>【お問い合わせ内容】</h2>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <th style="background-color: #f0f0f0; text-align: left; width: 150px;">お名前</th>
            <td>${data.name}</td>
          </tr>
          <tr>
            <th style="background-color: #f0f0f0; text-align: left;">メールアドレス</th>
            <td>${data.email}</td>
          </tr>
          <tr>
            <th style="background-color: #f0f0f0; text-align: left;">電話番号</th>
            <td>${data.phone || "未入力"}</td>
          </tr>
          <tr>
            <th style="background-color: #f0f0f0; text-align: left;">お問い合わせ先</th>
            <td>${facilityLabel}</td>
          </tr>
          <tr>
            <th style="background-color: #f0f0f0; text-align: left;">お問い合わせ内容</th>
            <td>${inquiryTypeLabel}</td>
          </tr>
          <tr>
            <th style="background-color: #f0f0f0; text-align: left; vertical-align: top;">メッセージ</th>
            <td style="white-space: pre-wrap;">${data.message}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          このメールは未来ネットワークのWebサイトから送信されました。
        </p>
      `,
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    // 自動返信メール（お問い合わせ者へ）
    const autoReplyOptions = {
      from: process.env.SMTP_USER || "mirainet2017@gmail.com",
      to: data.email,
      subject: "【未来ネットワーク】お問い合わせを受け付けました",
      text: `
${data.name} 様

この度は未来ネットワークにお問い合わせいただき、誠にありがとうございます。

以下の内容でお問い合わせを受け付けました。
担当者より折り返しご連絡いたしますので、今しばらくお待ちください。

【お問い合わせ内容】
お問い合わせ先: ${facilityLabel}
お問い合わせ内容: ${inquiryTypeLabel}

メッセージ:
${data.message}

---
一般社団法人未来ネットワーク
${facilityLabel}
      `.trim(),
      html: `
        <p>${data.name} 様</p>
        <p>この度は未来ネットワークにお問い合わせいただき、誠にありがとうございます。</p>
        <p>以下の内容でお問い合わせを受け付けました。<br>
        担当者より折り返しご連絡いたしますので、今しばらくお待ちください。</p>
        
        <h3>【お問い合わせ内容】</h3>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <th style="background-color: #f0f0f0; text-align: left; width: 150px;">お問い合わせ先</th>
            <td>${facilityLabel}</td>
          </tr>
          <tr>
            <th style="background-color: #f0f0f0; text-align: left;">お問い合わせ内容</th>
            <td>${inquiryTypeLabel}</td>
          </tr>
          <tr>
            <th style="background-color: #f0f0f0; text-align: left; vertical-align: top;">メッセージ</th>
            <td style="white-space: pre-wrap;">${data.message}</td>
          </tr>
        </table>
        
        <p style="margin-top: 20px;">
          ---<br>
          一般社団法人未来ネットワーク<br>
          ${facilityLabel}
        </p>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    res.json({ success: true, message: "お問い合わせを受け付けました" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "送信に失敗しました" });
  }
});

export default router;

