const YEAR = new Date().getFullYear()

export default {
  footer: (
    <small style={{ display: 'block', marginTop: '8rem', 'font-family': 'Silkscreen, sans-serif;' }}>
      <time>2020-{YEAR}</time> © nuts3745.
      <a href="/feed.xml">RSS</a>
      <style jsx>{`
        a {
          font-family: 'Silkscreen', sans-serif;
          float: right;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </small>
  )
}
