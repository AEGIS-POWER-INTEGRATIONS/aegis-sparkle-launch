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

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your login link for {BRAND.name}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Img src={BRAND.logoUrl} alt={BRAND.name} style={styles.logo} />
        <div style={styles.brandRow}>
          <Text style={styles.brandName}>{BRAND.name}</Text>
          <Text style={styles.brandTagline}>Engineering & AI Integration</Text>
        </div>
        <Heading style={styles.h1}>Your login link</Heading>
        <Text style={styles.text}>
          Click the button below to log in to {BRAND.name}. This link will expire
          shortly.
        </Text>
        <Button style={styles.button} href={confirmationUrl}>
          Log In
        </Button>
        <Text style={styles.footer}>
          If you didn't request this link, you can safely ignore this email.
          <br />
          <Link href={`https://${BRAND.rootDomain}`} style={styles.footerLink}>
            {BRAND.rootDomain}
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail
