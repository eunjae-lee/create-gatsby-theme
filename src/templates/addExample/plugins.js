{
  resolve: 'gatsby-source-filesystem',
  options: {
    name: 'pages',
    path: `${process.cwd()}/src/pages`,
  },
},
{
  resolve: 'gatsby-plugin-page-creator',
  options: {
    path: `${process.cwd()}/src/pages`,
  },
},
{{ nextPluginPlaceholder }}