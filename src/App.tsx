import { useState, useEffect } from 'react';
import { 
  Coffee, 
  BookOpen, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  Facebook, 
  MapPin, 
  Phone, 
  ArrowRight,
  ShoppingCart,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  { id: 1, name: "Espresso Intenso", price: 8.50, category: "Cafés", description: "Grãos 100% Arábica com notas de chocolate amargo.", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Cappuccino Verso", price: 14.00, category: "Cafés", description: "Leite vaporizado, espresso e um toque de canela.", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Cold Brew Vanilla", price: 16.00, category: "Bebidas", description: "Café extraído a frio por 18h com extrato de baunilha.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Croissant de Amêndoas", price: 12.00, category: "Doces", description: "Massa folhada francesa com recheio cremoso.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Grãos Etiópia (250g)", price: 45.00, category: "Produtos", description: "Notas florais e acidez cítrica equilibrada.", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Caneca Grão & Verso", price: 35.00, category: "Produtos", description: "Cerâmica artesanal com design exclusivo.", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400" },
];

// --- Components ---

const Navbar = ({ cartCount, onOpenCart, onNavigate }: { cartCount: number, onOpenCart: () => void, onNavigate: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <Coffee className="text-terracotta" size={28} />
          <span className="text-2xl font-serif font-bold tracking-tighter">Grão & Verso</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm uppercase tracking-widest">
          <button onClick={() => onNavigate('home')} className="hover:text-terracotta transition-colors">Home</button>
          <button onClick={() => onNavigate('menu')} className="hover:text-terracotta transition-colors">Cardápio</button>
          <button onClick={() => onNavigate('about')} className="hover:text-terracotta transition-colors">Sobre</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-terracotta transition-colors">Contato</button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCart}
            className="relative p-2 hover:bg-coffee-dark/5 rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-terracotta text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-cream border-t border-coffee-dark/10 p-6 flex flex-col gap-4 shadow-xl"
          >
            <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="text-left py-2 border-b border-coffee-dark/5">Home</button>
            <button onClick={() => { onNavigate('menu'); setIsOpen(false); }} className="text-left py-2 border-b border-coffee-dark/5">Cardápio</button>
            <button onClick={() => { onNavigate('about'); setIsOpen(false); }} className="text-left py-2 border-b border-coffee-dark/5">Sobre</button>
            <button onClick={() => { onNavigate('contact'); setIsOpen(false); }} className="text-left py-2 border-b border-coffee-dark/5">Contato</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <section className="pt-32 pb-12 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
          Cafés Especiais & <br /> <span className="text-terracotta italic">Doces Artesanais</span>
        </h1>
        <p className="text-xl text-coffee-dark/70 mb-10 max-w-2xl mx-auto">
          Peça agora o melhor café da região e receba em casa ou retire na loja. Qualidade garantida em cada grão.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => onNavigate('menu')}
            className="bg-coffee-dark text-cream px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-coffee-medium transition-all shadow-lg"
          >
            Ver Cardápio & Comprar
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const ProductCard = ({ product, onAddToCart }: { product: Product, onAddToCart: (p: Product) => void }) => (
  <motion.div 
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all border border-coffee-dark/5 group"
  >
    <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex flex-col h-[120px] justify-between">
      <div>
        <span className="text-[10px] uppercase tracking-widest text-terracotta font-bold">{product.category}</span>
        <h3 className="font-serif text-xl mb-1">{product.name}</h3>
        <p className="text-xs text-coffee-dark/60 line-clamp-2">{product.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-lg text-coffee-dark">R$ {product.price.toFixed(2)}</span>
        <button 
          onClick={() => onAddToCart(product)}
          className="bg-coffee-dark text-cream p-2 rounded-full hover:bg-terracotta transition-colors"
        >
          <ShoppingBag size={18} />
        </button>
      </div>
    </div>
  </motion.div>
);

const MenuSection = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Cafés', 'Bebidas', 'Doces', 'Produtos'];

  const filteredProducts = activeCategory === 'Todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-terracotta text-white shadow-md' 
                : 'bg-coffee-dark/5 text-coffee-dark hover:bg-coffee-dark/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => null; // Removed story section

const PromotionBanner = () => (
  <section className="py-6 px-6">
    <div className="max-w-7xl mx-auto bg-coffee-dark rounded-3xl p-8 text-cream flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <h2 className="text-3xl font-serif mb-2">Combo do Dia</h2>
        <p className="opacity-80">Café Espresso + Fatia de Bolo por apenas <span className="text-terracotta font-bold text-xl">R$ 18,00</span></p>
      </div>
      <button className="bg-terracotta text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
        Aproveitar Agora
      </button>
    </div>
  </section>
);

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, onCheckout }: { 
  isOpen: boolean, 
  onClose: () => void, 
  cart: CartItem[], 
  updateQuantity: (id: number, delta: number) => void,
  removeFromCart: (id: number) => void,
  onCheckout: () => void
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-coffee-dark/10 flex justify-between items-center">
              <h2 className="text-2xl font-serif">Seu Carrinho</h2>
              <button onClick={onClose} className="p-2 hover:bg-coffee-dark/5 rounded-full"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-coffee-dark/40 gap-4">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p>Seu carrinho está vazio.</p>
                  <button onClick={onClose} className="text-terracotta font-bold underline">Continuar Comprando</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-coffee-dark/60 mb-2">R$ {item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-coffee-dark/20 rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-coffee-dark/5">-</button>
                          <span className="px-3 py-1 text-sm font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-coffee-dark/5">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-1 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-coffee-dark/10 bg-white/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg">Total</span>
                  <span className="text-2xl font-bold text-terracotta">R$ {total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-coffee-dark text-cream py-4 rounded-full font-bold hover:bg-coffee-medium transition-colors flex items-center justify-center gap-2"
                >
                  Finalizar Compra <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CheckoutModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: () => void }) => {
  const [step, setStep] = useState(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-cream w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              {step === 1 ? (
                <>
                  <h2 className="text-3xl font-serif mb-6">Finalizar Pedido</h2>
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-xs uppercase font-bold tracking-widest mb-2 opacity-60">Nome Completo</label>
                      <input type="text" className="w-full bg-white border border-coffee-dark/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-terracotta/20" placeholder="Seu nome" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-bold tracking-widest mb-2 opacity-60">Endereço de Entrega</label>
                      <input type="text" className="w-full bg-white border border-coffee-dark/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-terracotta/20" placeholder="Rua, número, bairro" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-widest mb-2 opacity-60">Pagamento</label>
                        <select className="w-full bg-white border border-coffee-dark/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-terracotta/20">
                          <option>Cartão de Crédito</option>
                          <option>Pix</option>
                          <option>Dinheiro</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-widest mb-2 opacity-60">Telefone</label>
                        <input type="text" className="w-full bg-white border border-coffee-dark/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-terracotta/20" placeholder="(00) 00000-0000" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 py-4 border border-coffee-dark/10 rounded-full font-bold hover:bg-coffee-dark/5 transition-colors">Cancelar</button>
                    <button onClick={() => setStep(2)} className="flex-1 py-4 bg-coffee-dark text-cream rounded-full font-bold hover:bg-coffee-medium transition-colors">Confirmar Pedido</button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-serif mb-4">Pedido Realizado!</h2>
                  <p className="text-coffee-dark/60 mb-8">Seu café está sendo preparado com muito carinho e chegará em breve.</p>
                  <button 
                    onClick={() => { onConfirm(); setStep(1); }}
                    className="w-full py-4 bg-coffee-dark text-cream rounded-full font-bold hover:bg-coffee-medium transition-colors"
                  >
                    Voltar para a Loja
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer className="bg-coffee-dark text-cream py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <Coffee className="text-terracotta" size={32} />
          <span className="text-3xl font-serif font-bold tracking-tighter">Grão & Verso</span>
        </div>
        <p className="text-cream/60 max-w-sm mb-8">
          Mais que uma cafeteria, um espaço para nutrir a alma e a mente. Venha viver essa experiência literária e sensorial.
        </p>
        <div className="flex gap-4">
          <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Instagram size={20} /></a>
          <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Facebook size={20} /></a>
        </div>
      </div>
      
      <div>
        <h4 className="font-serif text-xl mb-6">Contato</h4>
        <ul className="space-y-4 text-cream/70">
          <li className="flex items-center gap-3"><MapPin size={18} className="text-terracotta" /> Rua das Letras, 123 - Centro</li>
          <li className="flex items-center gap-3"><Phone size={18} className="text-terracotta" /> (11) 98765-4321</li>
          <li className="flex items-center gap-3"><Coffee size={18} className="text-terracotta" /> Aberto todos os dias: 08h - 20h</li>
        </ul>
      </div>

      <div>
        <h4 className="font-serif text-xl mb-6">Newsletter</h4>
        <p className="text-cream/60 text-sm mb-4">Receba novidades literárias e promoções exclusivas.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Seu e-mail" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:border-terracotta" />
          <button className="bg-terracotta px-4 py-2 rounded-lg font-bold hover:bg-terracotta/80 transition-colors">OK</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-cream/40 text-xs uppercase tracking-widest">
      © 2026 Grão & Verso. Projeto Acadêmico.
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigate={setCurrentPage} 
      />

      <main>
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={setCurrentPage} />
            <PromotionBanner />
            <AboutSection />
            <section className="py-20 px-6 text-center bg-coffee-dark text-cream">
              <h2 className="text-4xl md:text-5xl mb-6">Pronto para um café?</h2>
              <button 
                onClick={() => setCurrentPage('menu')}
                className="bg-terracotta text-white px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform"
              >
                Explorar Cardápio
              </button>
            </section>
          </>
        )}

        {currentPage === 'menu' && (
          <div className="pt-20">
            <MenuSection onAddToCart={addToCart} />
          </div>
        )}

        {currentPage === 'about' && (
          <div className="pt-20">
            <AboutSection />
            <section className="py-20 px-6 bg-coffee-dark text-cream text-center">
              <div className="max-w-3xl mx-auto">
                <BookOpen className="mx-auto mb-8 text-terracotta" size={48} />
                <h2 className="text-4xl mb-6">Nossa Curadoria Literária</h2>
                <p className="text-lg opacity-70">
                  Cada mês selecionamos 5 títulos que harmonizam com nossos grãos sazonais. Membros do nosso clube recebem o livro em casa junto com uma amostra exclusiva de café.
                </p>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-5xl font-serif mb-8">Diga Olá</h2>
                <p className="text-lg text-coffee-dark/70 mb-12">
                  Tem alguma dúvida, sugestão ou quer apenas falar sobre café? Adoraríamos ouvir você.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-terracotta/10 text-terracotta rounded-2xl"><MapPin /></div>
                    <div>
                      <h4 className="font-bold">Endereço</h4>
                      <p className="text-coffee-dark/60">Rua das Letras, 123 - Centro, São Paulo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-terracotta/10 text-terracotta rounded-2xl"><Phone /></div>
                    <div>
                      <h4 className="font-bold">Telefone</h4>
                      <p className="text-coffee-dark/60">(11) 98765-4321</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[32px] shadow-xl">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Nome" className="w-full bg-cream/50 border border-coffee-dark/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-terracotta/20" />
                    <input type="email" placeholder="E-mail" className="w-full bg-cream/50 border border-coffee-dark/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-terracotta/20" />
                  </div>
                  <input type="text" placeholder="Assunto" className="w-full bg-cream/50 border border-coffee-dark/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-terracotta/20" />
                  <textarea placeholder="Sua mensagem" rows={5} className="w-full bg-cream/50 border border-coffee-dark/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-terracotta/20"></textarea>
                  <button className="w-full bg-coffee-dark text-cream py-4 rounded-xl font-bold hover:bg-coffee-medium transition-colors">Enviar Mensagem</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onConfirm={() => { setIsCheckoutOpen(false); setCart([]); setCurrentPage('home'); }}
      />
    </div>
  );
}
