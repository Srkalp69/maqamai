# MaqamAI — telefona kurulum

Bu klasör, MaqamAI'nin telefona kurulabilen sürümüdür (PWA). iPhone'da da Android'de de çalışır. Kurulduktan sonra ana ekranda kendi simgesiyle, tam ekran ve internet olmadan açılır. Kur'an metni, mealler, yazı tipleri ve makam verileri uygulamanın içindedir.

Kurulum için klasörün bir **https** adresinde yayımlanması gerekir. Dosyaları doğrudan telefondan açmak çalışmaz.

## 1. Yayımlama (bir kez)

**Netlify Drop (en hızlı; mağazaya göndermek için önerilir)**

1. app.netlify.com/drop sayfasını açın.
2. Bu klasörü sayfaya sürükleyip bırakın. Adres hemen hazır olur.
3. Adresin kalıcı olması için ücretsiz hesap açıp siteyi sahiplenin.

**GitHub Pages (ücretsiz, kalıcı)**

1. github.com'da yeni bir depo açın, örneğin `maqamai`. Depo herkese açık olsun.
2. Depoda **Add file → Upload files**'a basın. Bu klasördeki her şeyi sürükleyip bırakın: `index.html`, `manifest.webmanifest`, `sw.js`, `gizlilik.html`, `.nojekyll` ve `icons`, `fonts`, `screens` klasörleri. Sonra **Commit changes**'e basın.
3. **Settings → Pages** bölümünde **Source: Deploy from a branch** ve **Branch: main / (root)** seçip kaydedin.
4. Bir iki dakika sonra adres hazır olur: `https://KULLANICI-ADINIZ.github.io/maqamai/`

## 2. Telefona kurma

- **iPhone (Safari):** Adresi açın → **Paylaş** → **Ana Ekrana Ekle**.
- **Android (Chrome):** Adresi açın → çıkan **Yükle** düğmesine basın, ya da menü (⋮) → **Uygulamayı yükle**.

## 3. Google Play ve App Store

Mağaza adımları, mağaza metinleri ve ekran görüntüleri ayrı bir pakettedir: **MaqamAI-magaza.zip** (içindeki `MAGAZA.md`).

Gizlilik sayfası bu klasörde hazırdır: `https://ADRESINIZ/gizlilik.html`. Her iki mağaza da bu adresi ister.

## Kurulu uygulamada neler var?

- **Kur'an:** 114 sure, ayet seçimi, meşhur aşırlar, ezan ve kamet. Bütün ayetlerde okunuş ve tecvid renkleri var.
- **Canlı okuma:** Mikrofonla okurken perdenizi görürsünüz; ayetler siz okudukça ilerler.
- **Meşk:** Her ayeti önce üstaddan ya da neyden dinler, sonra okursunuz.
- **Perde çalışması:** Makamın perdelerini sesinizle tek tek oturtursunuz.
- **Kelime ve tecvid denetimi (deneysel):** Konuşma tanımayla atlanan kelimeleri ve harf hatalarını gösterir.
- **Üstad kaydı:** Dosya, video, bağlantı ya da ekran kaydıyla eklenir. İzinli kayıtlar paket olarak paylaşılır.
- **Hoca modu:** Okuyuş dosyası hocaya gider; hoca notunu verip geri gönderir.
- **Düzenli çalışma:** Günün aşrı, haftalık hedef ve takvim hatırlatıcısı. Yedekle yeni telefona taşıyabilirsiniz.
- **Paylaşım:** Android'de başka uygulamalardan **Paylaş → MaqamAI** ile ses, video ya da bağlantı gönderebilirsiniz.
- **Kısayollar:** Simgeye uzun basınca **Oku**, **Kur'an** ve **Üstad ekle** çıkar.
- **Dil:** Türkçe ve İngilizce (Ayarlar → Dil).
- **Gizlilik:** İnternetsiz açılır, hesap istemez. Ses kayıtları yalnızca telefonda saklanır.

Yeni bir sürüm yüklediğinizde uygulama açılışta "Yeni sürüm hazır" der. **Yenile**'ye basınca güncellenir.

## Kaynaklar

- **Kur'an metni:** Tanzil Project (tanzil.net), Uthmani, CC BY 3.0, değiştirilmeden.
- **Türkçe meal:** Dr. Ali Özek ve arkadaşları, QuranEnc.com (turkish_shahin, v1.0.0).
- **İngilizce meal:** Saheeh International (Noor International Center), QuranEnc.com (english_saheeh, v1.1.2).
- **Vakf işaretleri:** KFGQPC Hafs metni, Quranpedia.net.
- **Yazı tipleri:** Amiri, Amiri Quran, Manrope, Marcellus (SIL Open Font License; lisanslar `fonts` klasöründe).
