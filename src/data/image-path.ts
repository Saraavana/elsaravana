export type RecoveredFluidImage = {
  childImageSharp?: {
    fluid?: {
      src?: string;
      srcSet?: string;
      sizes?: string;
    };
  };
};

export type ResolvedImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
};

const legacyAssetOrigin = process.env.LEGACY_SITE_ORIGIN || "https://617bc89f272ddc000883571d--elsaravana.netlify.app";

function resolveRecoveredUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
  return new URL(normalizedUrl, legacyAssetOrigin).toString();
}

function resolveRecoveredSrcSet(srcSet: string | undefined): string | undefined {
  if (!srcSet) {
    return undefined;
  }

  return srcSet
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const match = entry.match(/^(\S+)(\s+.+)?$/);
      if (!match) {
        return entry;
      }

      const [, url, descriptor = ""] = match;
      return `${resolveRecoveredUrl(url)}${descriptor}`;
    })
    .join(", ");
}

export function resolveRecoveredImage(image: RecoveredFluidImage | undefined, fallbackSrc: string): ResolvedImage {
  const fluid = image?.childImageSharp?.fluid;
  if (!fluid?.src) {
    return { src: fallbackSrc };
  }

  return {
    src: resolveRecoveredUrl(fluid.src),
    srcSet: resolveRecoveredSrcSet(fluid.srcSet),
    sizes: fluid.sizes,
  };
}
