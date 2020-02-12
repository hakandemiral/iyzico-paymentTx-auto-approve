# iyzico-paymentTx-auto-approve
Iyzico pazar yeri çözümünü kullananların ödeme kırılımlarını tek seferde onaylamasını sağlayan küçük bir yazılım.

____

Kurulum

1.Paket Bağımlılıklarını kurun.
````text
npm install
````

2.**API_KEYS.js** dosyasında gerekli yerlere iyzico panelinizden edineceğiniz API anahtarlarınızı ekleyin.
````javascript
module.exports = API_KEYS = {
    apiKey: 'xxx',
    secretKey: 'xxx',
    uri: 'https://api.iyzipay.com'
};
````

3.**paymentTxId.txt** dosyasına ödeme kırılım kimliklerinizi her satıra bir adet olacak şekilde ekleyin, nasıl yapacağınızı buradan görebilirsiniz.

Çalıştırmak için;
````text
npm start
````

**Iyzico Ödeme Kırılımlarını Almak**

Iyzico müşteri panelinize girdikten sonra sol menüden Raporlar > İşlem Raporları yolunu izleyin, açılan sayfada günlük 
oluşturulan raporları görebilirsiniz veya sağ üstten maksimum 1 aylık olmak üzere kendi raporunuzu alabilrisiniz.
Raporu bilgisayara indirdikten sonra (tercihen .xls formatında) Excel veya eşdeğeri bir programla açın yada Google E-Tablolar'a 
yükleyebilirsiniz, listeyi ayıklayıp onaylamak istemediğiniz girdileri sildikten sonra "paymentTxId" isimli kolondaki tüm 
verileri kopyalayıp paymentTxId.txt dosyasına yapıştırabilirsiniz.

**İşlem Logları**

Tüm işlemlerin logları proje klasörü içindeki "logs" klasöründe tarih ve saatiyle beraber tutulmaktadır.