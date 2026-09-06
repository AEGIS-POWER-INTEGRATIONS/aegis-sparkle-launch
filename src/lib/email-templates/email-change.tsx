import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components'

import { BRAND, styles } from './brand'

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your new email for {BRAND.name}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Img src={BRAND.logoUrl} alt={BRAND.name} style={styles.logo} />
        <div style={styles.brandRow}>
          <Text style={styles.brandName}>{BRAND.name}</Text>
          <Text style={styles.brandTagline}>Engineering & AI Integration</Text>
        </div>
        <Heading style={styles.h1}>Confirm your new email</Heading>
        <Text style={styles.text}>
          You requested to change your {BRAND.name} email address from{' '}
          {oldEmail} to {newEmail}. Click the button below to confirm.
        </Text>
        <Button style={styles.button} href={confirmationUrl}>
          Confirm Email Change
        </Button>
        <Text style={styles.footer}>
          If you didn't request this change, you can safely ignore this email.
          <br />
          <Link href={`https://${BRAND.rootDomain}`} style={styles.footerLink}>
            {BRAND.rootDomain}
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
