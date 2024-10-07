export class ArkanoidFontLoader {
  async load() {
    const font = new FontFace('Press Start 2P', 'url(https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2)')

    try {
      await font.load()
      document.fonts.add(font)
      console.log('Font loaded successfully')
    } catch (error) {
      console.error('Error loading font:', error)
    }
  }
}
