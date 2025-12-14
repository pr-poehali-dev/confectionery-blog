import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: 'https://cdn.poehali.dev/projects/785d6b87-51fe-4957-a43c-1aee2f93240c/files/f935773d-2b54-4f60-816e-d81007ab1623.jpg',
    title: 'Элегантный свадебный торт',
    description: 'Нежный розовый торт с золотыми украшениями и флористическими узорами. Идеален для особых торжеств.',
    category: 'Торты'
  },
  {
    id: 2,
    image: 'https://cdn.poehali.dev/projects/785d6b87-51fe-4957-a43c-1aee2f93240c/files/ee399e28-5d6c-4a05-9923-f644b2839004.jpg',
    title: 'Французские макаруны',
    description: 'Яркие и воздушные макаруны в пастельных тонах. Разнообразие вкусов и идеальная текстура.',
    category: 'Десерты'
  },
  {
    id: 3,
    image: 'https://cdn.poehali.dev/projects/785d6b87-51fe-4957-a43c-1aee2f93240c/files/e5d267e3-dbc0-4346-a6c4-426e10cbcb39.jpg',
    title: 'Шоколадный торт премиум',
    description: 'Роскошный шоколадный торт с ганашем, золотыми листьями и свежими ягодами.',
    category: 'Торты'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sweet Dreams
            </h1>
            <div className="hidden md:flex gap-6">
              {['home', 'gallery', 'recipes', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`font-medium transition-all hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'recipes' && 'Рецепты'}
                  {section === 'about' && 'О мне'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button onClick={() => setIsOrderDialogOpen(true)} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              Заказать
            </Button>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <main className="animate-fade-in">
          <section className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-scale-in">
                Авторские кондитерские шедевры
              </h2>
              <p className="text-xl text-muted-foreground">
                Создаю уникальные торты и десерты, которые превращают каждый праздник в незабываемое событие
              </p>
              <div className="flex gap-4 justify-center pt-6">
                <Button 
                  onClick={() => setActiveSection('gallery')} 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg"
                >
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Посмотреть работы
                </Button>
                <Button 
                  onClick={() => setIsOrderDialogOpen(true)}
                  size="lg" 
                  variant="outline"
                  className="text-lg border-2 border-primary hover:bg-primary/10"
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Обсудить заказ
                </Button>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8">
              {galleryItems.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in border-2 hover:border-primary"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-sm font-semibold">{item.category}</p>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { icon: 'Award', text: 'Премиум качество', desc: 'Только натуральные ингредиенты' },
                { icon: 'Sparkles', text: 'Уникальный дизайн', desc: 'Индивидуальный подход к каждому заказу' },
                { icon: 'Clock', text: 'Точно в срок', desc: 'Своевременная доставка' },
                { icon: 'Heart', text: 'С любовью', desc: 'Каждое изделие создается с душой' }
              ].map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name={feature.icon as any} size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.text}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Card>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeSection === 'gallery' && (
        <section className="container mx-auto px-4 py-20 animate-fade-in">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Галерея работ
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Каждое изделие — уникальное произведение кондитерского искусства
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <Card 
                key={item.id}
                className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in border-2 hover:border-secondary"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                  <Button variant="ghost" className="mt-4 text-primary hover:text-secondary">
                    Подробнее <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'recipes' && (
        <section className="container mx-auto px-4 py-20 animate-fade-in text-center">
          <Icon name="BookOpen" size={64} className="mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold mb-4">Рецепты</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Скоро здесь появятся мои любимые рецепты и секреты кондитерского мастерства
          </p>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="container mx-auto px-4 py-20 animate-fade-in">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="User" size={48} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold">О мне</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Я — кондитер с многолетним опытом создания авторских десертов. Каждое изделие делаю с любовью 
              и вниманием к деталям. Моя цель — сделать ваш праздник незабываемым через вкус и визуальную красоту.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Использую только натуральные ингредиенты премиум-класса. Постоянно совершенствую навыки 
              и слежу за мировыми трендами в кондитерском искусстве.
            </p>
          </div>
        </section>
      )}

      {activeSection === 'contact' && (
        <section className="container mx-auto px-4 py-20 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Свяжитесь со мной</h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">sweet@dreams.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Instagram" size={24} className="text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Instagram</h3>
                    <p className="text-muted-foreground">@sweet_dreams_cakes</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      <Dialog open={selectedItem !== null} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl">
          {selectedItem && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedItem.title}</DialogTitle>
              </DialogHeader>
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="space-y-2">
                <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedItem.category}
                </span>
                <p className="text-muted-foreground">{selectedItem.description}</p>
              </div>
              <Button 
                onClick={() => {
                  setSelectedItem(null);
                  setIsOrderDialogOpen(true);
                }}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Заказать похожий торт
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Оформить заказ</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Имя</label>
              <Input placeholder="Ваше имя" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Телефон</label>
              <Input placeholder="+7 (999) 123-45-67" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Описание заказа</label>
              <Textarea placeholder="Расскажите, какой торт вы хотите заказать..." rows={4} />
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="Send" size={18} className="mr-2" />
              Отправить заявку
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">© 2024 Sweet Dreams. Все права защищены.</p>
          <div className="flex gap-4 justify-center mt-4">
            <Icon name="Instagram" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <Icon name="Facebook" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <Icon name="Mail" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
