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
  // oldEmail is the user's current address (HookData.OldEmail). For the
  // NEW-recipient half of a secure email_change fanout, `email` equals the
  // recipient (NEW), so the "from" line must render oldEmail to read
  // "from OLD to NEW" instead of "from NEW to NEW".
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
    <Preview>Confirm your email change for {BRAND.name}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Img src={BRAND.logoUrl} alt={BRAND.name} style={styles.logo} />
        <div style={styles.brandRow}>
          <Text style={styles.brandName}>{BRAND.name}</Text>
          <Text style={styles.brandTagline}>Engineering & AI Integration</Text>
        </div>
        <Heading style={styles.h1}>Confirm your email change</Heading>
        <Text style={styles.text}>
          You requested to change your email address for {BRAND.name} from{' '}
          <Link href={`mailto:${oldEmail}`} style={styles.link}>
            {oldEmail}
          </Link>{' '}
          to{' '}
          <Link href={`mailto:${newEmail}`} style={styles.link}>
            {newEmail}
          </Link>
          .
        </Text>
        <Text style={styles.text}>
          Click the button below to confirm this change:
        </Text>
        <Button style={styles.button} href={confirmationUrl}>
          Confirm Email Change
        </Button>
        <Text style={styles.footer}>
          If you didn't request this change, please secure your account
          immediately.
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
