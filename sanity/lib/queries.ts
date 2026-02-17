
export const heroQuery = `
  *[_type == "hero"][0]{
    subheading,
    heading,
    highlightedTextIndex,
    description,
    laptopImage,
    buttons,
    cards
  }
`;
// About Section Query
export const aboutQuery = `
  *[_type == "about"][0]{
    headingLight,
    headingBold,
    subtitle,
    focusTitle,
    focusDescription,
    highlightText,
    metrics[]{
      value,
      label,
      suffix
    },
    gridItems[]{
      category,
      title,
      subtitle,
      description,
      stats,
      color,
      image
    }
  }
`;

export const servicesQuery = `
  *[_type == "servicesSection"][0]{
    badgeTitle,
    headingLight,
    headingBold,
    description,
    services[]{
      title,
      description,
      features,
      stats,
      gradientStart,
      gradientEnd,
      icon,
      "imageUrl": image.asset->url
    }
  }
`;