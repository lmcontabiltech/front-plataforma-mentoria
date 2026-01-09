import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { PerfilUsuario } from 'src/app/login/perfil-usuario';
// import { PermissaoDescricao } from 'src/app/login/permissao-descricao';
// import { Usuario } from 'src/app/login/usuario';
// import { ModalConfirmacaoService } from 'src/app/services/modal/modal-confirmacao.service';
// import { AuthService } from 'src/app/services/seguranca/auth.service';
// import { Permissao } from 'src/app/login/permissao';
// import { AuthService } from 'src/app/services/auth.service';
// import { NotificacaoService } from 'src/app/services/feedback/notificacao.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @ViewChild('dropdownToggle') dropdownToggle!: ElementRef;

  isSidebarOpen = false;
  isDropdownOpen = false;
  isNotificationOpen = false;

  nomeUsuario: string = '';
  permissaoUsuario: string = '';
  fotoUsuario: string = '';
  bytesUsuario: number = 1200;
  notificacoes: any[] = [];

  private fotoSubscription: Subscription | null = null; // (Para limpar a memória)
  private perfilSubscription: Subscription | null = null;

  contadorNaoLidas = 0;
  private notificacaoSubscription?: Subscription;
  private tempoRealSubscription?: Subscription;
  private intervalSubscription?: Subscription;

  // private permissaoDescricao: { [key: string]: string } = {
  //   Admin: 'Administrador',
  //   COORDENADOR: 'Coordenador',
  //   USER: 'Colaborador',
  //   ESTAGIARIO: 'Estagiario',
  // };

  //teste
  constructor(
    private router: Router,
    private renderer: Renderer2,
    // private authService: AuthService,
    // private notificacaoService: NotificacaoService,
    // private modalConfirmacaoService: ModalConfirmacaoService,
    // private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // this.carregarPerfilUsuario();
    // this.carregarContadorNotificacoes();
    // this.conectarNotificacaoTempoReal();
    // this.iniciarAtualizacaoPeriodica();

    // this.fotoSubscription = this.authService.onPerfilFotoAtualizada.subscribe(
    //   (novaUrl: string) => {
    //     this.fotoUsuario = novaUrl; // <<< Atualiza a foto instantaneamente
    //   }
    // );
  }

  ngAfterViewInit(): void {
    if (!this.sidebar || !this.header || !this.content) {
      console.error('Erro: Elementos da Navbar não foram encontrados');
    }
  }

  ngOnDestroy(): void {
    // this.desconectarNotificacoes();
    this.perfilSubscription?.unsubscribe();
    this.fotoSubscription?.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    
    if (this.isNotificationOpen) {
      const notificationButton = document.querySelector('.notification-button');
      const dropdownNotification = document.querySelector('.dropdown-notification');
      
      if (notificationButton && dropdownNotification) {
        if (!notificationButton.contains(target) && !dropdownNotification.contains(target)) {
          this.isNotificationOpen = false;
        }
      }
    }
    
    if (this.isDropdownOpen) {
      const usuarioContainer = document.querySelector('.usuario');
      const usuarioMobileContainer = document.querySelector('.usuario-mobile');
      
      const clickedInsideDesktop = usuarioContainer?.contains(target);
      const clickedInsideMobile = usuarioMobileContainer?.contains(target);
      
      if (!clickedInsideDesktop && !clickedInsideMobile) {
        this.isDropdownOpen = false;
        
        const dropdownToggle = document.getElementById('dropdown-toggle');
        const dropdownToggleMobile = document.getElementById('dropdown-toggle-mobile');
        
        if (dropdownToggle) {
          dropdownToggle.classList.remove('active');
        }
        if (dropdownToggleMobile) {
          dropdownToggleMobile.classList.remove('active');
        }
      }
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;

    if (this.sidebar && this.header && this.content) {
      if (this.isSidebarOpen) {
        this.renderer.addClass(this.sidebar.nativeElement, 'show-sidebar');
        this.renderer.addClass(this.header.nativeElement, 'left-pd');
        this.renderer.addClass(this.content.nativeElement, 'shifted');
        this.renderer.setStyle(
          this.content.nativeElement,
          'margin-left',
          '280px'
        );
      } else {
        this.renderer.removeClass(this.sidebar.nativeElement, 'show-sidebar');
        this.renderer.removeClass(this.header.nativeElement, 'left-pd');
        this.renderer.removeClass(this.content.nativeElement, 'shifted');
        this.renderer.setStyle(
          this.content.nativeElement,
          'margin-left',
          '90px'
        );
      }
    }
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;

    if (this.sidebar && this.header && this.content) {
      this.renderer.removeClass(this.sidebar.nativeElement, 'show-sidebar');
      this.renderer.removeClass(this.header.nativeElement, 'left-pd');
      this.renderer.removeClass(this.content.nativeElement, 'shifted');
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownToggle = document.getElementById('dropdown-toggle');
    const dropdownToggleMobile = document.getElementById('dropdown-toggle-mobile');
    
    if (dropdownToggle) {
      if (this.isDropdownOpen) {
        dropdownToggle.classList.add('active');
      } else {
        dropdownToggle.classList.remove('active');
      }
    }
    
    if (dropdownToggleMobile) {
      if (this.isDropdownOpen) {
        dropdownToggleMobile.classList.add('active');
      } else {
        dropdownToggleMobile.classList.remove('active');
      }
    }
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  logout() {
    // this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getRandomColor(seed: string): string {
    const colors = [
      '#FFB3BA', // Rosa pastel
      '#FFDFBA', // Laranja pastel
      '#BAFFC9', // Verde pastel
      '#BAE1FF', // Azul pastel
      '#D5BAFF', // Roxo pastel
    ];
    const index = seed ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }

  // private carregarPerfilUsuario(): void {
  //   this.authService.obterPerfilUsuario().subscribe({
  //     next: (response: PerfilUsuario) => {
  //       this.nomeUsuario = response.nome;
  //       this.permissaoUsuario = response.permissaoUsuario || '';
  //       this.fotoUsuario = response.fotoUrl || '';
      
  //     },
  //     error: (err: any) => {
  //       console.error('Erro ao buscar perfil do usuário', err);
  //     },
  //   });
  // }

  // private carregarContadorNotificacoes(): void {
  //   this.notificacaoSubscription = this.notificacaoService
  //     .getContadorNaoLidas()
  //     .subscribe({
  //       next: (contador) => {
  //         this.contadorNaoLidas = contador;
  //       },
  //       error: (error) => {},
  //     });
  // }

  // private conectarNotificacaoTempoReal(): void {
  //   this.tempoRealSubscription = this.notificacaoService
  //     .getNotificacoesTempoReal()
  //     .subscribe({
  //       next: (novaNotificacao) => {
  //         if (!novaNotificacao.lida) {
  //           this.contadorNaoLidas++;
  //           console.log('🔢 Contador atualizado para:', this.contadorNaoLidas);
  //         }
  //       },
  //       error: (error) => {
  //         // Reconectar após 5 segundos
  //         setTimeout(() => {
  //           this.conectarNotificacaoTempoReal();
  //         }, 5000);
  //       },
  //     });
  // }

  // private iniciarAtualizacaoPeriodica(): void {
  //   // Atualizar contador a cada 2 minutos como fallback
  //   this.intervalSubscription = new Subscription();

  //   const interval = setInterval(() => {
  //     this.carregarContadorNotificacoes();
  //   }, 120000); // 2 minutos

  //   this.intervalSubscription.add(() => clearInterval(interval));
  // }

  // private desconectarNotificacoes(): void {
  //   if (this.notificacaoSubscription) {
  //     this.notificacaoSubscription.unsubscribe();
  //   }

  //   if (this.tempoRealSubscription) {
  //     this.tempoRealSubscription.unsubscribe();
  //   }

  //   if (this.intervalSubscription) {
  //     this.intervalSubscription.unsubscribe();
  //   }
  // }

  // public atualizarContadorNotificacoes(): void {
  //   this.carregarContadorNotificacoes();
  // }

  // public notificacaoLida(): void {
  //   if (this.contadorNaoLidas > 0) {
  //     this.contadorNaoLidas--;
  //   }
  // }


  // traduzirPermissaoUsuario(permissao: string): string {
  //   return  PermissaoDescricao[permissao as keyof typeof PermissaoDescricao] || 'Permissão não atribuída';

  // }

  toggleNotifications(): void {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  openModalLogout(): void {
    // this.modalConfirmacaoService.openModal(
    //   {
    //     title: 'Sair da Plataforma',
    //     description: `Tem certeza que deseja sair da plataforma <strong>Flow</strong>? Você será redirecionado para a tela de login.`,
    //     confirmTextoBotao: 'Sair',
    //     size: 'md',
    //   },
    //   () => {
    //     this.authService.encerrarSessao();
    //     this.router.navigate(['/login']);
    //   }
    // );
  }
}
