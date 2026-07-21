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

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email for {BRAND.name}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Img src={BRAND.logoUrl} alt={BRAND.name} style={styles.logo} />
        <div style={styles.brandRow}>
          <Text style={styles.brandName}>{BRAND.name}</Text>
          <Text style={styles.brandTagline}>Engineering & AI Integration</Text>
        </div>
        <Heading style={styles.h1}>Confirm your email</Heading>
        <Text style={styles.text}>
          Thanks for signing up for{' '}
          <Link href={siteUrl} style={styles.link}>
            <strong>{BRAND.name}</strong>
          </Link>
          .
        </Text>
        <Text style={styles.text}>
          Please confirm your email address (
          <Link href={`mailto:${recipient}`} style={styles.link}>
            {recipient}
          </Link>
          ) by clicking the button below:
        </Text>
        <Button style={styles.button} href={confirmationUrl}>
          Verify Email
        </Button>
        <Text style={styles.footer}>
          If you didn't create an account, you can safely ignore this email.
          <br />
          <Link href={`https://${BRAND.rootDomain}`} style={styles.footerLink}>
            {BRAND.rootDomain}
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
