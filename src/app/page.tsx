// ... existing imports
// Update the ProjectImageCard usage within the map function:

<ProjectImageCard
  key={index}
  image={image}
  delay={2.3}
  href={`/work/${image.alt.toLowerCase().replace(/ /g, '-').replace(/\./g, '')}`}
/>
// ...