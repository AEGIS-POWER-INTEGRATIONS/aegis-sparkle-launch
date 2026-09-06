import * as React from 'react'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

import type { TemplateEntry } from './registry'
import { BRAND, styles } from './brand'

interface ContactInquiryInternalProps {
  inquiryType?: string
  name?: string
  company?: string
  role?: string
  email?: string
  phone?: string
  locale?: string
  sourcePath?: string
  message?: string
  details?: Record<string, string>
}

const cell = { color: BRAND.colors.muted, fontSize: '14px', padding: '4px 12px 4px 0' }
const cellValue = { color: BRAND.colors.foreground, fontSize: '14px', padding: '4px 0' }

const ContactInquiryInternal = ({
  inquiryType = '-',
  name = '-',
  company,
  role,
  email = '-',
  phone,
  locale = '-',
  sourcePath,
  message = '',
  details = {},
}: ContactInquiryInternalProps) => {
  const rows: [string, string][] = [
    ['詢問類型 Type', inquiryType],
    ['姓名 Name', name],
    ['公司 Company', company || '-'],
    ['職稱 Role', role || '-'],
    ['Email', email],
    ['電話 Phone', phone || '-'],
    ['語言 Locale', locale],
    ['來源頁 Source', sourcePath || '-'],
    ...Object.entries(details).map(([k, v]) => [k, v] as [string, string]),
  ]

  return (
    <Html lang="zh-Hant" dir="ltr">
      <Head />
      <Preview>網站詢問 New website inquiry</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.h1}>網站詢問 New website inquiry</Heading>
          <table cellPadding={0} style={{ borderCollapse: 'collapse' }}>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <td style={cell}>{k}</td>
                  <td style={cellValue}>
                    <strong>{v}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Heading as="h3" style={{ ...styles.h1, fontSize: '16px', margin: '24px 0 12px' }}>
            需求描述 Message
          </Heading>
          <Text style={{ ...styles.text, whiteSpace: 'pre-wrap' }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ContactInquiryInternal,
  subject: (data: Record<string, any>) =>
    `[網站詢問] ${data['inquiryType'] ?? ''}｜${data['name'] ?? ''}${
      data['company'] ? `／${data['company']}` : ''
    }`,
  displayName: '網站詢問通知（內部）',
  previewData: {
    inquiryType: 'engineering',
    name: '王小明',
    company: '示範股份有限公司',
    role: '工程經理',
    email: 'demo@example.com',
    phone: '0900-000-000',
    locale: 'zh-TW',
    sourcePath: '/contact',
    message: '想了解資料中心佈線與導入時程。',
  },
} satisfies TemplateEntry

export default ContactInquiryInternal
