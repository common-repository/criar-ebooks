<div class="wrap">

    <div class="row page-login">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <div class="head">
                <a href="https://criarebooks.com.br" target="_blank">
                    <img class="pce-logo" src="<?php echo plugins_url( 'images/logo.png', __FILE__ ); ?>"/>
                </a>
            </div>
            <div id="painel-login" class="row"> 
                <div class="col-md-6">         
                    <h1><?php echo __('Para utilizar os serviços do Criar eBooks você precisa criar uma conta.', 'criar-ebooks'); ?></h1><br/>
                    <p><?php echo __('Após a criação e ativação de sua conta no nosso site, através de um processo bem rápido, você já poderá iniciar o uso do seu plugin wordpress.', 'criar-ebooks'); ?></p>
                    <a class="btn btn-primary" href="https://criarebooks.com.br/criar-conta.php" target="_blank"><?php echo __('Acessar o site e criar conta', 'criar-ebooks'); ?></a>
                </div>
                <div class="col-md-2"></div>
                <div class="col-md-4">
                    <h1><?php echo __('Já tenho uma conta', 'criar-ebooks'); ?></h1>
                    <form id="form-login" method="POST" onsubmit="plugce_login(jQuery('#pce-email').val(), jQuery('#pce-senha').val()); return false;">
                        <input type="hidden" name="logar" value="true"/>
                        <div class="form-group">
                            <label for="pce-email"><?php echo __('E-mail', 'criar-ebooks'); ?></label>
                            <input type="email" class="form-control" id="pce-email" name="pce-email" value="">
                        </div>
                        <div class="form-group">
                            <label for="pce-senha"><?php echo __('Senha', 'criar-ebooks'); ?></label>
                            <input type="password" class="form-control" id="pce-senha" name="pce-senha">
                        </div>
                        <button type="submit" class="btn btn-primary"><?php echo __('Entrar', 'criar-ebooks'); ?></button>
                        <a href="https://criarebooks.com.br/esqueci-senha.php" type="button" class="btn btn-link" target="_blank"><?php echo __('Perdi a senha', 'criar-ebooks'); ?></a>
                    </form>
                </div>
            </div>
        </div>        
        <div class="col-md-2"></div>
    </div>
    
    <div class="row page-login">
        <div class="col-md-2"></div>
        <div class="col-md-8">      
            <div class="head">
                <h3><?php echo __('Com este plugin você pode...', 'criar-ebooks'); ?></h3>
            </div>  
            <div id="painel-login" class="row">
                <h4><?php echo __('Criar um eBook novo em 4 passos!', 'criar-ebooks'); ?></h4>
                <ol>
                    <li><?php echo __('Defina título, descrição, entre outros dados, capítulos e seções de seu eBook', 'criar-ebooks'); ?>;</li>
                    <li><?php echo __('Defina tamanhos de folha e fontes, defina capas e divisões internas personalizadas', 'criar-ebooks'); ?>;</li>
                    <li><?php echo __('Escreva seu conteúdo em todas os capítulos ou seções. Inclua imagens e tabelas', 'criar-ebooks'); ?>;</li>
                    <li><?php echo __('Pronto, agora você já pode fazer o download do seu novo eBook exclusivo', 'criar-ebooks'); ?>.</li>
                </ol>
                <h4><?php echo __('Ou enviar seu eBook pronto!', 'criar-ebooks'); ?></h4>
                <ol>
                    <li><?php echo __('Defina título, descrição, entre outros dados', 'criar-ebooks'); ?>;</li>
                    <li><?php echo __('Defina capa e envie seu eBook em PDF, EPUB e/ou MOBI', 'criar-ebooks'); ?>;</li>
                    <li><?php echo __('Crie códigos de incorporação para disponibilizar o eBook em seu site', 'criar-ebooks'); ?>;</li>
                    <li><?php echo __('Pronto, agora seus visitantes podem fazer o download de seu eBook', 'criar-ebooks'); ?>.</li>
                </ol>
                <a class="btn btn-primary" href="https://criarebooks.com.br/criar-conta.php" target="_blank"><?php echo __('Acessar o site e criar conta', 'criar-ebooks'); ?></a>
            </div>
        </div>        
        <div class="col-md-2"></div>
    </div>

    <div class="row aplicacao">
        <div class="col-md-9">
            <div class="meus-livros">
                <div class="livros"></div>
            </div>
            <div class="sem-ebooks center" style="display: none;">
                <h2><?php echo __('Olá, vamos criar seu primeiro eBook?', 'criar-ebooks'); ?></h2>
                <p><?php echo __('Escolha uma opção abaixo para iniciar o processo', 'criar-ebooks'); ?></p>
            </div>
            <div class="acoes-principais center">
                <a class="btn btn-outline-primary" onclick="plugce_addEbook('criado');">
                    <span class="dashicons dashicons-plus"></span> <?php echo __('Criar novo eBook', 'criar-ebooks'); ?>
                </a>
                <a class="btn btn-outline-primary" onclick="plugce_addEbook('enviado');">
                    <span class="dashicons dashicons-upload"></span> <?php echo __('Upload eBook pronto', 'criar-ebooks'); ?>
                </a>
            </div>
        </div>
        <div class="col-md-3">
            <div class="head">
                <a href="https://criarebooks.com.br" target="_blank">
                    <img class="pce-logo" src="<?php echo plugins_url( 'images/logo.png', __FILE__ ); ?>"/>
                </a>
            </div>
            <div id="sua-conta">
                <div class="alert alert-danger" role="alert" style="text-align: center;">
                    <p><strong>Atenção:</strong> Este produto poderá ser utilizado pelos usuário já cadastrados apenas até o dia <strong>10/08/2024</strong>, após esta data ele será descontinuado.</p>
                    <p>Para quaisquer dúvidas acesse <a href="https://criarebooks.com.br/faq-descontinuado.php" target="_blank">nosso FAQ</a> ou envie e-mail para contato@criarebooks.com.br.</p>
                </div>
                <h1><?php echo __('Detalhes de sua conta', 'criar-ebooks'); ?></h1>
                <h4>
                    <?php echo __('Seu saldo de créditos:', 'criar-ebooks'); ?> <span class="saldo"></span>*
                </h4>
                <a class="btn btn-primary" href="https://criarebooks.com.br/carrinho.php" target="_blank"><span class="dashicons dashicons-plus-alt"></span> <?php echo __('Comprar mais créditos', 'criar-ebooks'); ?></a><br/><br/>
                <h5>
                    <?php echo __('Sua assinatura:', 'criar-ebooks'); ?> <span class="assinatura"></span>
                </h5>
                <h6>
                    <?php echo __('Espaço utilizado:', 'criar-ebooks'); ?> <span class="assinatura-espaco"></span>
                </h6>
                <a class="btn btn-secondary" href="https://criarebooks.com.br/assinaturas-premium.php" target="_blank"><span class="dashicons dashicons-plus-alt"></span> <?php echo __('Mais espaço em disco', 'criar-ebooks'); ?></a><br/><br/>
                <hr/>
                <div class="d-grid gap-2">
                    <a class="btn btn-sm btn-outline-secondary" href="https://criarebooks.com.br/minha-conta.php" target="_blank"><span class="dashicons dashicons-admin-generic"></span> <?php echo __('Alterar dados da conta ou senha', 'criar-ebooks'); ?></a>
                    <a class="btn btn-sm btn-outline-secondary" href="#" onclick="plugce_logout()"><span class="dashicons dashicons-exit"></span> <?php echo __('Logout (sair)', 'criar-ebooks'); ?></a>
                </div>
            </div>
        </div>
    </div>
    
    <div id="myModal-novo-ebook" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><?php echo __('Vamos começar a criar seu novo eBook!', 'criar-ebooks'); ?></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="form-dados-livro" method="POST" action="#">
                        <h6><?php echo __('Informe os dados básicos do livro', 'criar-ebooks'); ?>*</h6>
                        <p class="small">*<?php echo __('Edite abaixo. Você poderá alterar estes dados a qualquer momento depois.', 'criar-ebooks'); ?></p>       
                        <div class="form-group">
                            <label for="titulo"><?php echo __('Título do livro', 'criar-ebooks'); ?></label>
                            <input type="text" class="form-control" id="titulo" name="titulo" value="" required/>
                        </div>
                        <div class="form-group">
                            <label for="subtitulo"><?php echo __('Subtítulo do livro', 'criar-ebooks'); ?></label>
                            <input type="text" class="form-control" id="subtitulo" name="subtitulo" value=""/>
                        </div>    
                        <div class="form-group">
                            <label for="descricao"><?php echo __('Descrição do livro', 'criar-ebooks'); ?></label>
                            <textarea class="form-control" id="descricao" name="descricao"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="autores"><?php echo __('Autor(es)', 'criar-ebooks'); ?></label>
                            <input type="text" class="form-control" id="autores" name="autores" value=""/>                
                        </div>
                        <hr/>
                        <h6><?php echo __('Defina a estrutura do eBook', 'criar-ebooks'); ?>**</h6>
                        <p class="small">**<?php echo __('Remova ou inclua abaixo. Você poderá alterar esta estrutura a qualquer momento depois.', 'criar-ebooks'); ?></p>
                        <div class="form-group">
                            <label for="estrutura"><?php echo __('Mantenha uma seção por linha', 'criar-ebooks'); ?></label>
                            <textarea class="form-control" id="estrutura" name="estrutura" required>
Capa
Sumário
Introdução
Capítulo 1
Capítulo 2
Conclusão</textarea>                    
                        </div>
                    </form>
                </div>   
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"><?php echo __('Cancelar', 'criar-ebooks'); ?></button>
                    <button id="salvar" type="button" class="btn btn-primary" onclick="plugce_salvarNovoEbook('criado');"><?php echo __('Criar', 'criar-ebooks'); ?></button>
                </div>            
            </div>
        </div>
    </div>

    <div id="myModal-upload-ebook" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><?php echo __('Envie o(s) arquivo(s) de seu eBook!', 'criar-ebooks'); ?></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="form-dados-upload-livro" enctype="multipart/form-data" method="POST" action="#">   
                        <div class="form-group">
                            <label for="arquivo"><?php echo __('Escolha o arquivo (PDF, EPUB ou MOBI)', 'criar-ebooks'); ?></label>
                            <input type="file" class="form-control" id="input-upload-arquivo" name="input-upload-arquivo" value="" required/>
                        </div>
                    </form>
                </div>   
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"><?php echo __('Cancelar', 'criar-ebooks'); ?></button>
                    <button id="salvar" type="button" class="btn btn-primary" disabled="disabled"><?php echo __('Enviar', 'criar-ebooks'); ?></button>
                </div>            
            </div>
        </div>
    </div>

    <div id="myModal-enviar-ebook" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><?php echo __('Vamos enviar seu eBook pronto!', 'criar-ebooks'); ?></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="form-dados-envio-livro" method="POST" action="#">
                        <h6><?php echo __('Informe os dados básicos do livro', 'criar-ebooks'); ?>*</h6>
                        <p class="small">*<?php echo __('Edite abaixo. Você poderá alterar estes dados a qualquer momento depois.', 'criar-ebooks'); ?></p>       
                        <div class="form-group">
                            <label for="titulo"><?php echo __('Título do livro', 'criar-ebooks'); ?></label>
                            <input type="text" class="form-control" id="titulo" name="titulo" value="" required/>
                        </div>
                        <div class="form-group">
                            <label for="subtitulo"><?php echo __('Subtítulo do livro', 'criar-ebooks'); ?></label>
                            <input type="text" class="form-control" id="subtitulo" name="subtitulo" value=""/>
                        </div>    
                        <div class="form-group">
                            <label for="descricao"><?php echo __('Descrição do livro', 'criar-ebooks'); ?></label>
                            <textarea class="form-control" id="descricao" name="descricao"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="autores"><?php echo __('Autor(es)', 'criar-ebooks'); ?></label>
                            <input type="text" class="form-control" id="autores" name="autores" value=""/>                
                        </div> 
                        <div class="form-group">
                            <label for="paginas"><?php echo __('Nº de páginas', 'criar-ebooks'); ?></label>
                            <input type="number" class="form-control" id="paginas" name="paginas" value="1" min="1"/>                
                        </div>  
                        <div class="form-group">
                            <label><?php echo __('Arquivo do livro', 'criar-ebooks'); ?></label>
                            <p class="small"><?php echo __('Você poderá enviar arquivos PDF, EPUB ou MOBI no próximo passo.', 'criar-ebooks'); ?></p>
                        </div>
                    </form>
                </div>   
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"><?php echo __('Cancelar', 'criar-ebooks'); ?></button>
                    <button id="salvar" type="button" class="btn btn-primary" onclick="plugce_salvarNovoEbook('enviado');"><?php echo __('Criar', 'criar-ebooks'); ?></button>
                </div>            
            </div>
        </div>
    </div>

    <div id="myModal-novo-embed" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><?php echo __('Criar código de incorporação', 'criar-ebooks'); ?></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><?php echo __('Crie um código de incorporação para possibilitar o download de seu eBook diretamente em seu site.', 'criar-ebooks'); ?></p>
                    <div class="form-group">
                        <label for="titulo"><?php echo __('Informe um título para o novo código', 'criar-ebooks'); ?></label>
                        <input type="text" class="form-control" id="titulo" name="titulo" value="">
                    </div>
                </div>   
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"><?php echo __('Cancelar', 'criar-ebooks'); ?></button>
                    <button id="salvar" type="button" class="btn btn-primary"><?php echo __('Criar', 'criar-ebooks'); ?></button>
                </div>            
            </div>
        </div>
    </div>  

    <div id="myModal-dados" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><?php echo __('Dados recebidos através do código de incorporação', 'criar-ebooks'); ?></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"></div>
                <div id="link-export" style="display: none;"></div>                
            </div>
        </div>
    </div>

    <div id="myModal-edit-ebook" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><?php echo __('Edite seu eBook', 'criar-ebooks'); ?></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="plugce_getEbooksUsuario();"></button>
                </div>
                <div class="modal-body"></div>
                <div id="link-export" style="display: none;"></div>                
            </div>
        </div>
    </div>
    
</div>

<script>
    jQuery(window).ready(function(){
        plugce_initAplicacao();
    });
</script>    