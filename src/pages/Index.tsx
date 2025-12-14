import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Recipe {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  time: string;
  servings: number;
  ingredients: string[];
  steps: string[];
  views?: number;
  isPremium?: boolean;
}

interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
  rating: number;
}

const recipes: Recipe[] = [
  {
    id: 1,
    image: 'https://cdn.poehali.dev/projects/785d6b87-51fe-4957-a43c-1aee2f93240c/files/f935773d-2b54-4f60-816e-d81007ab1623.jpg',
    title: 'Элегантный розовый торт',
    description: 'Нежный бисквитный торт с кремом из маскарпоне и ягодами. Идеален для особых случаев.',
    category: 'Торты',
    isPremium: true,
    difficulty: 'Сложный',
    time: '3 часа',
    servings: 12,
    ingredients: [
      '6 яиц',
      '200 г сахара',
      '200 г муки',
      '500 г маскарпоне',
      '300 мл сливок 33%',
      '150 г сахарной пудры',
      'Ванильный экстракт',
      'Пищевой краситель розовый',
      'Свежие ягоды для украшения'
    ],
    steps: [
      'Разогрейте духовку до 180°C. Взбейте яйца с сахаром до пышной пены.',
      'Аккуратно вмешайте просеянную муку. Выпекайте бисквит 35-40 минут.',
      'Взбейте маскарпоне со сливками и сахарной пудрой до устойчивых пиков.',
      'Разделите крем на части, одну окрасьте в розовый цвет.',
      'Разрежьте остывший бисквит на 3 коржа. Пропитайте сиропом.',
      'Соберите торт, чередуя коржи и крем. Покройте торт кремом.',
      'Украсьте торт розами из крема и свежими ягодами. Охладите 2 часа.'
    ]
  },
  {
    id: 2,
    image: 'https://cdn.poehali.dev/projects/785d6b87-51fe-4957-a43c-1aee2f93240c/files/ee399e28-5d6c-4a05-9923-f644b2839004.jpg',
    title: 'Французские макаруны',
    description: 'Воздушные миндальные печенья с нежной начинкой. Классика французской кондитерской.',
    category: 'Десерты',
    difficulty: 'Сложный',
    time: '2 часа',
    servings: 30,
    ingredients: [
      '200 г миндальной муки',
      '200 г сахарной пудры',
      '150 г яичных белков (комнатной температуры)',
      '200 г сахара',
      '50 мл воды',
      'Пищевые красители',
      'Для ганаша: 200 г шоколада, 150 мл сливок'
    ],
    steps: [
      'Просейте миндальную муку и сахарную пудру. Смешайте с половиной белков.',
      'Сварите сироп из сахара и воды до 118°C. Взбейте вторую половину белков.',
      'Влейте горячий сироп в белки тонкой струйкой, продолжая взбивать.',
      'Смешайте меренгу с миндальной массой методом макаронаж.',
      'Отсадите макаруны на противень. Подсушите 30 минут до образования корочки.',
      'Выпекайте при 150°C 12-15 минут. Приготовьте ганаш.',
      'Склейте половинки макарунов ганашем. Выдержите в холодильнике сутки.'
    ]
  },
  {
    id: 3,
    image: 'https://cdn.poehali.dev/projects/785d6b87-51fe-4957-a43c-1aee2f93240c/files/e5d267e3-dbc0-4346-a6c4-426e10cbcb39.jpg',
    title: 'Шоколадный торт премиум',
    description: 'Роскошный многослойный торт с темным шоколадом, ганашем и ягодами.',
    category: 'Торты',
    difficulty: 'Средний',
    time: '2.5 часа',
    servings: 10,
    ingredients: [
      '200 г темного шоколада 70%',
      '200 г сливочного масла',
      '5 яиц',
      '150 г сахара',
      '100 г муки',
      '50 г какао',
      'Для ганаша: 300 г шоколада, 200 мл сливок',
      'Свежие ягоды',
      'Золотые хлопья для декора'
    ],
    steps: [
      'Растопите шоколад с маслом на водяной бане.',
      'Взбейте яйца с сахаром. Добавьте шоколадную массу.',
      'Вмешайте просеянную муку и какао. Выпекайте при 180°C 25-30 минут.',
      'Приготовьте ганаш: доведите сливки до кипения, залейте шоколад.',
      'Разрежьте торт на 2-3 коржа. Пропитайте кофейным сиропом.',
      'Промажьте коржи ганашем, соберите торт.',
      'Покройте торт ганашем, украсьте ягодами и золотыми хлопьями.'
    ]
  }
];

const categories = ['Все', 'Торты', 'Десерты', 'Выпечка', 'Крем'];

const Index = () => {
  const [activeSection, setActiveSection] = useState('recipes');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  const [recipeViews, setRecipeViews] = useState<{ [key: number]: number }>({
    1: 1247,
    2: 892,
    3: 1534
  });
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({
    1: [
      { id: 1, author: 'Анна', date: '10 дек 2024', text: 'Потрясающий рецепт! Торт получился очень нежным и красивым. Гости были в восторге!', rating: 5 },
      { id: 2, author: 'Мария', date: '8 дек 2024', text: 'Делала на день рождения дочки. Все прошло отлично, спасибо за подробные инструкции!', rating: 5 }
    ],
    2: [
      { id: 3, author: 'Елена', date: '12 дек 2024', text: 'Макаруны получились с первого раза! Очень довольна результатом.', rating: 5 }
    ]
  });
  const [newComment, setNewComment] = useState({ author: '', text: '' });

  const filteredRecipes = recipes
    .filter(recipe => selectedCategory === 'Все' || recipe.category === selectedCategory)
    .filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleAddComment = () => {
    if (selectedRecipe && newComment.author && newComment.text) {
      const comment: Comment = {
        id: Date.now(),
        author: newComment.author,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
        text: newComment.text,
        rating: 5
      };
      setComments(prev => ({
        ...prev,
        [selectedRecipe.id]: [...(prev[selectedRecipe.id] || []), comment]
      }));
      setNewComment({ author: '', text: '' });
    }
  };

  const handleOpenRecipe = (recipe: Recipe) => {
    if (recipe.isPremium && !isPremiumUser) {
      setShowPremiumDialog(true);
      return;
    }
    setSelectedRecipe(recipe);
    setRecipeViews(prev => ({
      ...prev,
      [recipe.id]: (prev[recipe.id] || 0) + 1
    }));
  };

  const handleDownloadPDF = () => {
    if (!selectedRecipe) return;
    
    const content = `
${selectedRecipe.title}
${'='.repeat(selectedRecipe.title.length)}

${selectedRecipe.description}

Категория: ${selectedRecipe.category}
Сложность: ${selectedRecipe.difficulty}
Время приготовления: ${selectedRecipe.time}
Порций: ${selectedRecipe.servings}

ИНГРЕДИЕНТЫ:
${selectedRecipe.ingredients.map((ing, i) => `${i + 1}. ${ing}`).join('\n')}

ПРИГОТОВЛЕНИЕ:
${selectedRecipe.steps.map((step, i) => `Шаг ${i + 1}: ${step}`).join('\n\n')}

---
Рецепт с сайта Sweet Kitchen
© 2024 Sweet Kitchen. Все права защищены.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedRecipe.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sweet Kitchen
            </h1>
            <div className="hidden md:flex gap-6">
              {['recipes', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`font-medium transition-all hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {section === 'recipes' && 'Рецепты'}
                  {section === 'about' && 'О блоге'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button 
                variant={isPremiumUser ? 'default' : 'outline'}
                onClick={() => setShowPremiumDialog(true)}
                className={isPremiumUser ? 'bg-gradient-to-r from-accent to-secondary' : 'border-accent text-accent hover:bg-accent/10'}
              >
                <Icon name="Crown" size={18} className="mr-2" />
                {isPremiumUser ? 'Premium' : 'Получить Premium'}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowDonateDialog(true)}
                className="border-primary hover:bg-primary/10"
              >
                <Icon name="Heart" size={18} className="mr-2" />
                Поддержать
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {activeSection === 'recipes' && (
        <main className="animate-fade-in">
          <section className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-scale-in">
                Кондитерские рецепты
              </h2>
              <p className="text-xl text-muted-foreground">
                Проверенные рецепты тортов и десертов с пошаговыми инструкциями
              </p>
            </div>
          </section>

          <section className="container mx-auto px-4 pb-8">
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск рецептов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
          </section>

          {!isPremiumUser && (
            <section className="container mx-auto px-4 pb-8">
              <Card className="p-6 bg-gradient-to-r from-accent/10 via-secondary/10 to-primary/10 border-accent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                      <Icon name="Sparkles" size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Рекламный блок</h3>
                      <p className="text-sm text-muted-foreground">Профессиональные формы для выпечки со скидкой 25%</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-accent hover:bg-accent/10">
                    Перейти в магазин
                  </Button>
                </div>
              </Card>
            </section>
          )}

          <section className="container mx-auto px-4 pb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe, index) => (
                <Card 
                  key={recipe.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in border-2 hover:border-primary"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleOpenRecipe(recipe)}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {recipe.isPremium && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center text-white">
                          <Icon name="Crown" size={48} className="mx-auto mb-2 text-accent" />
                          <p className="font-bold">Premium</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <Badge className="bg-accent text-accent-foreground">
                        {recipe.category}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/90">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {recipe.time}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{recipe.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{recipe.description}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Icon name="ChefHat" size={16} />
                        <span>{recipe.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={16} />
                        <span>{recipe.servings} порций</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Eye" size={14} />
                      <span>{recipeViews[recipe.id] || 0} просмотров</span>
                    </div>
                    <Button variant="ghost" className="mt-4 w-full text-primary hover:text-secondary">
                      Смотреть рецепт <Icon name="ArrowRight" size={18} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeSection === 'about' && (
        <section className="container mx-auto px-4 py-20 animate-fade-in">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Cookie" size={48} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold">О блоге</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Добро пожаловать в мой кондитерский блог! Здесь я делюсь проверенными рецептами 
              тортов, десертов и выпечки. Каждый рецепт протестирован и содержит подробные 
              пошаговые инструкции.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Я — профессиональный кондитер с 10-летним опытом. Моя цель — сделать кондитерское 
              искусство доступным для каждого, кто любит создавать вкусные десерты дома.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <p className="text-muted-foreground">Рецептов</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-secondary mb-2">50K+</div>
                <p className="text-muted-foreground">Читателей</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">10</div>
                <p className="text-muted-foreground">Лет опыта</p>
              </Card>
            </div>
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
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">recipes@sweetkitchen.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Instagram" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Instagram</h3>
                    <p className="text-muted-foreground">@sweet_kitchen_recipes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Youtube" size={24} className="text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">YouTube</h3>
                    <p className="text-muted-foreground">Sweet Kitchen</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      <Dialog open={selectedRecipe !== null} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-3xl">{selectedRecipe.title}</DialogTitle>
              </DialogHeader>
              
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.title}
                className="w-full h-80 object-cover rounded-lg"
              />
              
              <div className="flex gap-4 flex-wrap">
                <Badge className="bg-accent text-accent-foreground">{selectedRecipe.category}</Badge>
                <Badge variant="secondary">
                  <Icon name="Clock" size={14} className="mr-1" />
                  {selectedRecipe.time}
                </Badge>
                <Badge variant="secondary">
                  <Icon name="ChefHat" size={14} className="mr-1" />
                  {selectedRecipe.difficulty}
                </Badge>
                <Badge variant="secondary">
                  <Icon name="Users" size={14} className="mr-1" />
                  {selectedRecipe.servings} порций
                </Badge>
                <Badge variant="secondary">
                  <Icon name="Eye" size={14} className="mr-1" />
                  {recipeViews[selectedRecipe.id] || 0} просмотров
                </Badge>
              </div>

              <p className="text-muted-foreground text-lg">{selectedRecipe.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="ShoppingBasket" size={24} className="text-primary" />
                    Ингредиенты
                  </h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="List" size={24} className="text-secondary" />
                    Приготовление
                  </h3>
                  <ol className="space-y-3">
                    {selectedRecipe.steps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="Heart" size={18} className="mr-2" />
                  В избранное
                </Button>
                <Button variant="outline">
                  <Icon name="Share2" size={18} className="mr-2" />
                  Поделиться
                </Button>
                <Button variant="outline" onClick={handleDownloadPDF}>
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать
                </Button>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} className="text-primary" />
                  Комментарии ({comments[selectedRecipe.id]?.length || 0})
                </h3>

                <div className="space-y-4 mb-6">
                  {comments[selectedRecipe.id]?.map((comment) => (
                    <Card key={comment.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{comment.author}</h4>
                          <p className="text-sm text-muted-foreground">{comment.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={16}
                              className={i < comment.rating ? 'text-accent fill-accent' : 'text-muted'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{comment.text}</p>
                    </Card>
                  ))}
                </div>

                <Card className="p-4">
                  <h4 className="font-semibold mb-4">Оставить комментарий</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Ваше имя"
                      value={newComment.author}
                      onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                    />
                    <Textarea
                      placeholder="Ваш комментарий..."
                      value={newComment.text}
                      onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                      rows={3}
                    />
                    <Button
                      onClick={handleAddComment}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      disabled={!newComment.author || !newComment.text}
                    >
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name="Crown" size={28} className="text-accent" />
              Premium подписка
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Получите доступ ко всем премиум-рецептам и эксклюзивному контенту!
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5" />
                <span>Безлимитный доступ к 50+ премиум-рецептам</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5" />
                <span>Видео мастер-классы от шеф-кондитера</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5" />
                <span>Персональные консультации в чате</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5" />
                <span>Отсутствие рекламы на сайте</span>
              </div>
            </div>
            <Card className="p-4 bg-gradient-to-br from-accent/10 to-secondary/10 border-accent">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold">Месячная подписка</span>
                <div className="text-right">
                  <div className="text-2xl font-bold">490₽</div>
                  <div className="text-xs text-muted-foreground">в месяц</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-lg font-semibold">Годовая подписка</span>
                  <Badge className="ml-2 bg-accent">-40%</Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">2990₽</div>
                  <div className="text-xs text-muted-foreground">249₽/мес</div>
                </div>
              </div>
            </Card>
            <Button 
              onClick={() => {
                setIsPremiumUser(true);
                setShowPremiumDialog(false);
              }}
              className="w-full bg-gradient-to-r from-accent to-secondary hover:opacity-90 text-lg h-12"
            >
              <Icon name="Crown" size={20} className="mr-2" />
              Оформить Premium
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Отменить подписку можно в любой момент
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDonateDialog} onOpenChange={setShowDonateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name="Heart" size={28} className="text-primary" />
              Поддержать блог
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Ваша поддержка помогает создавать больше качественных рецептов и улучшать блог!
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-16 text-lg font-bold">
                100₽
              </Button>
              <Button variant="outline" className="h-16 text-lg font-bold">
                300₽
              </Button>
              <Button variant="outline" className="h-16 text-lg font-bold">
                500₽
              </Button>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Своя сумма</label>
              <Input type="number" placeholder="Введите сумму" className="h-12" />
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Способы оплаты:</p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-sm">СБП</Badge>
                <Badge variant="secondary" className="text-sm">Карта</Badge>
                <Badge variant="secondary" className="text-sm">YooMoney</Badge>
                <Badge variant="secondary" className="text-sm">Boosty</Badge>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg h-12">
              <Icon name="Heart" size={20} className="mr-2" />
              Поддержать
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Спасибо за вашу щедрость! ❤️
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {!isPremiumUser && (
        <div className="fixed bottom-4 right-4 max-w-sm z-40 animate-fade-in">
          <Card className="p-4 bg-gradient-to-br from-accent/95 to-secondary/95 border-accent shadow-2xl backdrop-blur">
            <div className="flex items-start gap-3">
              <Icon name="Sparkles" size={24} className="text-white flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Реклама</h3>
                <p className="text-sm text-white/90 mb-3">
                  Кондитерские инструменты премиум-класса со скидкой 20%!
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="text-xs">
                    Подробнее
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-xs text-white hover:bg-white/20"
                    onClick={() => setShowPremiumDialog(true)}
                  >
                    Убрать рекламу
                  </Button>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:bg-white/20 -mt-2 -mr-2"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </Card>
        </div>
      )}

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">© 2024 Sweet Kitchen. Все права защищены.</p>
          <div className="flex gap-4 justify-center mt-4">
            <Icon name="Instagram" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <Icon name="Youtube" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <Icon name="Mail" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;