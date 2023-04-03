XML to MySQL with CRUD Operations and Pagination
This project converts XML data to MySQL database, and provides a responsive webpage with CRUD operations, pagination and search functionality.
Search option searches values of uuid.

Prerequisites
Node.js (v14.16.1 or later)
MySQL database
PlanetScale database account (optional)
Prisma
Setup
Clone the repository:
bash
Copy code
git clone https://github.com/shahreukh/nextjs-mysql-crud.git
Install the dependencies:
bash
Copy code
cd your-repo-name
npm install
Set up your database:
Create a .env file in the root of the project and add your database credentials:

makefile
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=hevi
If you are using PlanetScale, you can set up your .env file with the following variables:

npm run dev
Usage
Once the server is running, you can access the following endpoints:

GET /api/users: Get all data with pagination and search parameters.
GET /api/users/:id: Get a specific data by ID.
POST /api/users: Create a new data.
PUT /api/users/:id: Update an data by ID.
DELETE /api/users/:id: Delete an data by ID.
The pagination and search parameters can be passed as query parameters:

page: The page number to return (default is 1).
pageSize: The number of items to return per page (default is 10).
search: The search query to filter the results (default is an empty string).
Example usage:

Deployment
This project can be deployed to any hosting provider that supports Node.js applications. To deploy it, you can run the following command:

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
MIT

Developed by: Shahrukh Mirza Nawandish
Email: shahreukh@gmail.com

---

TÜRKÇE

Bu proje, XML verilerini MySQL veritabanına dönüştürür ve CRUD işlemleri, sayfalama ve arama işlevleri olan responsive bir web sayfası sağlar. Arama seçeneği, uuid değerlerinin değerlerini arar.

Bu proje XML verilerini MySQL veritabanına dönüştürür ve sayfalama ve arama işlevleri ile CRUD işlemleri sağlar.

Gereksinimler
Node.js (v14.16.1 veya daha yenis)
MySQL veritabanı
PlanetScale veritabanı hesabı (isteğe bağlı)
Kurulum
Depoyu kopyalayın:
bash
Copy code
git clone https://github.com/shahreukh/nextjs-mysql-crud.git
Bağımlılıkları yükleyin:
bash
Copy code
cd your-repo-name
npm install
Veritabanınızı ayarlayın:
Projelerin kökünde bir .env dosyası oluşturun ve veritabanı kimlik bilgilerinizi ekleyin:

makefile
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=hevi
PlanetScale kullanıyorsanız, aşağıdaki değişkenleri içeren .env dosyanızı ayarlayabilirsiniz:

npm run dev
Kullanım
Sunucu çalıştırıldığında, aşağıdaki uç noktalara erişebilirsiniz:

GET /api/users: Sayfalama ve arama parametreleriyle tüm verileri alın.
GET /api/users/:id: ID'ye göre belirli bir veriyi alın.
POST /api/users: Yeni bir veri oluşturun.
PUT /api/users/:id: ID'ye göre bir veriyi güncelleyin.
DELETE /api/users/:id: ID'ye göre bir veriyi silin.
Sayfalama ve arama parametreleri sorgu parametreleri olarak iletilir:

sayfa: Geri döndürülecek sayfa numarası (varsayılan 1).
pageSize: Sayfa başına döndürülecek öğe sayısı (varsayılan 10).
arama: Sonuçları filtrelemek için arama sorgusu (varsayılan boş dize).
Örnek kullanım:

Yayınlama
Bu proje, Node.js uygulamalarını destekleyen herhangi bir barındırma sağlayıcısına dağıtılabilir. Dağıtmak için aşağıdaki komutu çalıştırabilirsiniz:

Katılım
Pull talepleri memnuniyetle karşılanır. Büyük değişiklikler için önce ne yapmak istediğinizi tartışmak için bir sorun açın.

Lisans
MIT
