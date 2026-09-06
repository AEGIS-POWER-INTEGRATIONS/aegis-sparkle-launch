import * as React from 'react'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components'

import type { TemplateEntry } from './registry'
import { BRAND, styles } from './brand'

interface ContactInquiryAckProps {
  name?: string
  message?: string
  locale?: string
}

const quote = {
  ...styles.text,
  whiteSpace: 'pre-wrap' as const,
  borderLeft: `3px solid ${BRAND.colors.border}`,
  paddingLeft: '12px',
  color: BRAND.colors.muted,
}

const ContactInquiryAck = ({
  name = '',
  message = '',
  locale = 'zh-TW',
}: ContactInquiryAckProps) => {
  const en = locale === 'en'
  return (
    <Html lang={en ? 'en' : 'zh-Hant'} dir="ltr">
      <Head />
      <Preview>
        {en
          ? `We received your enquiry — ${BRAND.nameEn}`
          : '我們已收到您的詢問｜宏鼎集成股份有限公司'}
      </Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Img src={BRAND.logoUrl} alt={BRAND.name} style={styles.logo} />
          <div style={styles.brandRow}>
            <Text style={styles.brandName}>{BRAND.name}</Text>
            <Text style={styles.brandTagline}>Engineering & AI Integration</Text>
          </div>
          <Heading style={styles.h1}>
            {en ? 'Thank you for your enquiry' : '感謝您的詢問'}
          </Heading>
          {en ? (
            <>
              <Text style={styles.text}>Dear {name},</Text>
              <Text style={styles.text}>
                Thank you for contacting {BRAND.nameEn} (Aegis Power Integrations
                Co., Ltd.). We have received your enquiry and a member of our team
                will reply to this address shortly.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.text}>{name} 您好，</Text>
              <Text style={styles.text}>
                感謝您與宏鼎集成股份有限公司聯繫，我們已收到您的詢問，將盡快由專人回覆此信箱。
              </Text>
            </>
          )}
          <Text style={quote}>{message}</Text>
          <Text style={styles.text}>
            {en ? `Best regards,` : '宏鼎集成股份有限公司 敬上'}
            {en ? (
              <>
                <br />
                {BRAND.nameEn}
              </>
            ) : null}
          </Text>
          <Text style={styles.footer}>
            <Link href={`https://${BRAND.rootDomain}`} style={styles.footerLink}>
              {BRAND.rootDomain}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ContactInquiryAck,
  subject: (data: Record<string, any>) =>
    data['locale'] === 'en'
      ? `We received your enquiry — ${BRAND.nameEn}`
      : '我們已收到您的詢問｜宏鼎集成股份有限公司',
  displayName: '詢問回覆確認（客戶）',
  previewData: {
    name: '王小明',
    locale: 'zh-TW',
    message: '想了解資料中心佈線與導入時程。',
  },
} satisfies TemplateEntry

export default ContactInquiryAck
