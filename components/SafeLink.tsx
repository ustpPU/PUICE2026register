import type { AnchorHTMLAttributes } from 'react';

type SafeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
};

/**
 * Uses a native browser navigation so the public site does not depend on
 * framework prefetch/hydration before a visitor's first tap can work.
 */
export default function SafeLink({ href, ...props }: SafeLinkProps) {
  return <a href={href} {...props} />;
}
