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

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You've been invited to join {BRAND.name}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Img src={BRAND.logoUrl} alt={BRAND.name} style={styles.logo} />
        <div style={styles.brandRow}>
          <Text style={styles.brandName}>{BRAND.name}</Text>
          <Text style={styles.brandTagline}>Engineering & AI Integration</Text>
        </div>
        <Heading style={styles.h1}>You've been invited</Heading>
        <Text style={styles.text}>
          You've been invited to join{' '}
          <Link href={siteUrl} style={styles.link}>
            <strong>{BRAND.name}</strong>
          </Link>
          . Click the button below to accept the invitation and create your
          account.
        </Text>
        <Button style={styles.button} href={confirmationUrl}>
          Accept Invitation
        </Button>
        <Text style={styles.footer}>
          If you weren't expecting this invitation, you can safely ignore this
          email.
          <br />
          <Link href={`https://${BRAND.rootDomain}`} style={styles.footerLink}>
            {BRAND.rootDomain}
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
