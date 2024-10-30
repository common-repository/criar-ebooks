var plugce_urlBaseApi = "https://criarebooks.com.br/API/";

var plugce_saldoUsuario = 0;
var plugce_assinaturaUsuario = "";
var b64ArquivoEbook = "";
var formatoArquivoEbook = "";

function plugce_initAplicacao(){
    jQuery('.page-login').removeClass('open');
    jQuery('.aplicacao').removeClass('close');
    plugce_getSaldoUsuario();
    plugce_getAssinaturaUsuario();
	plugce_getEbooksUsuario();
}

function plugce_login(email, senha){
    var token = btoa(email + ":" + senha);
    jQuery.ajax({
        type: "POST",
        url: plugce_urlBaseApi + "auth/V1/",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + token);
        }
    }).success(function(data) {
        localStorage.setItem('pce-token', token);
        plugce_initAplicacao();
    }).fail(function() {
        alert('Dados de login não conferem');
    });
}

function plugce_logout(){
	localStorage.removeItem('pce-token');
	plugce_solicitaLogin();
}

function plugce_solicitaLogin(){
    jQuery('.page-login').addClass('open');
    jQuery('.aplicacao').addClass('close');
}

function plugce_getToken(){
    if(localStorage.getItem('pce-token') != undefined){
        return localStorage.getItem('pce-token');
    } else {
        plugce_solicitaLogin();
        return false;
    }    
}

jQuery('#input-upload-arquivo').on('change', function(){
    const file = jQuery(this)[0].files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = function(){
        if(!(/(\.pdf|\.epub|\.mobi)$/i).exec(file.name)){
            alert('O arquivo que você selecionou não é permitido. Serão aceitos apenas arquivos no formato PDF, EPUB ou MOBI');
			jQuery("#input-upload-arquivo").val('');
			jQuery('#myModal-upload-ebook #salvar').attr('disabled','disabled');
            b64ArquivoEbook = "";
        } else {
			if((/(\.pdf)$/i).exec(file.name)){		
				formatoArquivoEbook	= "pdf";		
			} else if((/(\.epub)$/i).exec(file.name)){
				formatoArquivoEbook	= "epub";
            } else if((/(\.mobi)$/i).exec(file.name)){
				formatoArquivoEbook	= "mobi";
            }	
            jQuery('#myModal-upload-ebook #salvar').removeAttr('disabled');
            b64ArquivoEbook = fileReader.result;
        }            
    }
    fileReader.readAsDataURL(file);
});

function plugce_getSaldoUsuario(){
    jQuery('#sua-conta .saldo').html('Consultando...');
    jQuery('#sua-conta .saldoDiv2').html('');
    if(plugce_getToken()) {
        jQuery.ajax({
            type: "POST",
            url: plugce_urlBaseApi + "credits/V1/",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
            }
        }).done(function(data) {
            plugce_saldoUsuario = data[0].credits;
            jQuery('#sua-conta .saldo').html(plugce_saldoUsuario);
            jQuery('#sua-conta .saldoDiv2').html(Math.floor((plugce_saldoUsuario/2)));
        }).fail(function() {
            plugce_solicitaLogin();
        });
    } else {
        plugce_solicitaLogin();
    }
}

function plugce_getAssinaturaUsuario(){
    jQuery('#sua-conta .assinatura').html('Consultando...');
	jQuery('#sua-conta .assinatura-espaco').html('Consultando...');
    if(plugce_getToken()) {
        jQuery.ajax({
            type: "POST",
            url: plugce_urlBaseApi + "signatures/V1/",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
            }
        }).done(function(data) {
            plugce_assinaturaUsuario = data[0].signature.name;
			var espacoDisponivel = data[0].signature['available space'];
			var espacoUtilizado = data[0]['used space'];
            jQuery('#sua-conta .assinatura').html(plugce_assinaturaUsuario);
			jQuery('#sua-conta .assinatura-espaco').html(espacoUtilizado + " / " + espacoDisponivel);
        }).fail(function() {
            plugce_solicitaLogin();
        });
    } else {
        plugce_solicitaLogin();
    }
}

function plugce_addEbook(tipo){
	if(plugce_getToken()) {
		if(tipo == "criado") {
			plugce_openModal('myModal-novo-ebook');
			setTimeout(function(){
				jQuery('#myModal-novo-ebook #titulo').focus();
			}, 500);
		} else if(tipo == "enviado") {
			plugce_openModal('myModal-enviar-ebook');
			setTimeout(function(){
				jQuery('#myModal-enviar-ebook #titulo').focus();
			}, 500);
		}
	} else {
        plugce_solicitaLogin();
    }	
}

function plugce_salvarNovoEbook(tipo){
	if(plugce_getToken()) {
		var titulo = "";
		var subtitulo = "";
		var descricao = "";
		var autores = "";
		var estrutura = "";
		if(tipo == "criado"){
			titulo = jQuery('form#form-dados-livro #titulo').val();
			subtitulo = jQuery('form#form-dados-livro #subtitulo').val();
			descricao = jQuery('form#form-dados-livro #descricao').val();
			autores = jQuery('form#form-dados-livro #autores').val();
			estrutura = jQuery('form#form-dados-livro #estrutura').val().split("\n");
		} else if(tipo == "enviado"){
			titulo = jQuery('form#form-dados-envio-livro #titulo').val();
			subtitulo = jQuery('form#form-dados-envio-livro #subtitulo').val();
			descricao = jQuery('form#form-dados-envio-livro #descricao').val();
			autores = jQuery('form#form-dados-envio-livro #autores').val();
		}
		jQuery.ajax({
			type: "POST",
			url: plugce_urlBaseApi + "ebooks/create/V1/",
			dataType: 'json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
			},
			data: {tipo: tipo, titulo: titulo, subtitulo: subtitulo, descricao: descricao, autores: autores, estrutura: estrutura}
		}).done(function(data) {
			var novoEbook = data[0].newEbook;
			if(tipo == "criado" && novoEbook > 0 && confirm('Seu novo eBook foi criado com sucesso.')){
				jQuery('form#form-dados-livro #titulo').val('');
				jQuery('form#form-dados-livro #subtitulo').val('');
				jQuery('form#form-dados-livro #descricao').val('');
				jQuery('form#form-dados-livro #autores').val('');
				plugce_closeModal('myModal-novo-ebook');
				plugce_getEbooksUsuario();
			} else if(tipo == "enviado" && novoEbook > 0){
				jQuery('form#form-dados-envio-livro #titulo').val('');
				jQuery('form#form-dados-envio-livro #subtitulo').val('');
				jQuery('form#form-dados-envio-livro #descricao').val('');
				jQuery('form#form-dados-envio-livro #autores').val('');
				plugce_closeModal('myModal-enviar-ebook');
				plugce_getEbooksUsuario();
				plugce_uploadLivro(novoEbook);
			}
		}).fail(function() {
			plugce_solicitaLogin();
		});
	} else {
        plugce_solicitaLogin();
    }
}

function plugce_editarEbook(idLivro){
	if(plugce_getToken()) {
		var token = encodeURI(plugce_getToken());
		jQuery('#myModal-edit-ebook .modal-body').html('<iframe src="https://www.criarebooks.com.br/aplicacao-embed.php?token=' + token + '&livro=' + idLivro + '" name="embed-ce" frameborder="0" style="width:100%;max-width:100%;height:100%;max-height:100%;"></iframe>');
		plugce_openModal('myModal-edit-ebook');
	} else {
        plugce_solicitaLogin();
    }
}

function plugce_getEbooksUsuario(){
	jQuery('.aplicacao .meus-livros .livros').html('Consultando...');
    if(plugce_getToken()) {
        jQuery.ajax({
            type: "POST",
            url: plugce_urlBaseApi + "ebooks/list/V1/",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
            }
        }).done(function(data) {
            jQuery('.aplicacao .meus-livros .livros').html('');
			if(data[0].ebooks == "") {
				jQuery('.aplicacao .meus-livros').hide();
				jQuery('.aplicacao .sem-ebooks').show();
			} else {
				jQuery.each(data[0].ebooks, function(index, arrEbook){
					var elem =  '<div class="livro" id="' + index + '">';
						elem += arrEbook.html_capa;
						elem += '<div class="dados">';
						elem += '<h2>' + arrEbook.titulo + '</h2>';
						elem += '<h3>' + arrEbook.subtitulo + '</h3>';
						elem += '<p>' + arrEbook.descricao + '</p>';
						elem += '<hr/>';
						elem += '<p>Autor(es): ' + arrEbook.autores + '</p>';
						elem += '<p>Palavras-chaves: ' + arrEbook.palavras_chaves + '</p>';
						elem += '<div class="btn-group btn-group-sm btn-block" role="group" aria-label="Downloads">';
						jQuery.each(arrEbook.formatos, function(indexF, formato){
							elem += '<button type="button" class="btn btn-sm btn-outline-secondary" onclick="plugce_downloadLivro(jQuery(this), \'' + index + '\', \'' + formato + '\');">';
							elem += '<span class="dashicons dashicons-download"></span> Download ' + formato;
							elem += '</button>';
						});
						elem += '</div>';
						if(arrEbook.tipo == "enviado") {
							elem += '<button type="button" class="btn btn-sm btn-block btn-secondary" onclick="plugce_uploadLivro(\'' + index + '\');">';
							elem += '<span class="dashicons dashicons-upload"></span> Enviar/substituir arquivos PDF, EPUB ou MOBI';
							elem += '</button>';
						}
						if(arrEbook.formatos.length > 0){
							elem += '<div class="codigos">';
							elem += '<h4>Divulgar o eBook no site</h4>';
							elem += '<div class="codigos-criados"></div>';
							elem += '<a class="btn btn-secondary" onclick="plugce_modalNovoEmbed(\'' + index + '\');"><span class="dashicons dashicons-plus-alt"></span> Criar código rápido</a>';
							if(arrEbook.tipo == "criado") {
								elem += '<a id="editar-ebook" class="btn btn-info" onclick="plugce_editarEbook(\'' + index + '\');"><span class="dashicons dashicons-edit"></span> Editar capa, definições e conteúdo</a>';
							} else {
								elem += '<a id="editar-ebook" class="btn btn-info" onclick="plugce_editarEbook(\'' + index + '\');"><span class="dashicons dashicons-edit"></span> Editar capa e definições</a>';
							}
							elem += '</div>';
						}
						elem += '</div>';
						elem += '</div>';
					jQuery(elem).appendTo('.aplicacao .meus-livros .livros'); 
					plugce_getCodigosLivro(index);
				});
			}
        }).fail(function() {
            plugce_solicitaLogin();
        });
    } else {
        plugce_solicitaLogin();
    }
}

function plugce_uploadLivro(idLivro){
	if(plugce_getToken()) {
		plugce_openModal('myModal-upload-ebook');
		jQuery('#myModal-upload-ebook #salvar').attr('onclick','plugce_uploadFileLivro(\'' + idLivro + '\')');
	} else {
        plugce_solicitaLogin();
    }
}

function plugce_uploadFileLivro(idLivro){
	if(plugce_getToken() && b64ArquivoEbook != "") {
		jQuery('#myModal-upload-ebook #salvar').attr('disabled','disabled').html('Enviando...');
		jQuery.ajax({
			type: "POST",
			url: plugce_urlBaseApi + "ebooks/upload/V1/",
			dataType: 'json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
			},
			data: {ebook: idLivro, formato: formatoArquivoEbook, b64: b64ArquivoEbook}
		}).done(function(data) {
			plugce_closeModal('myModal-upload-ebook');
			jQuery('#myModal-upload-ebook #salvar').html('Enviar');
			jQuery("#input-upload-arquivo").val('');
			plugce_getEbooksUsuario();
		}).fail(function() {
			plugce_solicitaLogin();
		});
	} else {
        plugce_solicitaLogin();
    }
}

function plugce_downloadLivro(elem, idLivro, formato){
	var btnOrig = elem.html();
	elem.removeClass('btn-outline-secondary').addClass('btn-primary').addClass('progress-bar-animated').addClass('progress-bar-striped').html('Carregando ' + formato + '...');
	jQuery.ajax({
		type: "POST",
		url: plugce_urlBaseApi + "ebooks/download/V1/",
		dataType: 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
		},
		data: {ebook: idLivro, formato: formato}
	}).done(function(data) {
		var b64 = data[0].fileBase64;
		b64 = b64.replace('data:application/' + data[0].formato + ';base64,','');
		jQuery('#myModal-dados #link-export').html('<a id="link-download" download="'+ data[0].nome + '.' + data[0].formato + '" href="data:application/octet-stream;base64,' + b64 +'">Download</a>');
		jQuery('#link-download')[0].click();
		elem.removeClass('btn-primary').removeClass('progress-bar-animated').removeClass('progress-bar-striped').addClass('btn-outline-secondary').html(btnOrig);
	}).fail(function() {
		plugce_solicitaLogin();
	});
}

function plugce_getCodigosLivro(idLivro){
	jQuery('.aplicacao .meus-livros #' + idLivro + '.livro .codigos-criados').html('Consultando...');
    if(plugce_getToken()) {
        jQuery.ajax({
            type: "POST",
            url: plugce_urlBaseApi + "codes/list/V1/",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
            },
			data: {ebook: idLivro}
        }).done(function(data) {
			if(data[0].codes.length == 0){
				jQuery('.aplicacao .meus-livros #' + idLivro + '.livro .codigos-criados').html('<p>Nenhum código criado até o momento.</p>');
			} else {
				var elem = '';
				var modalCodigos = '';
				    elem +=  '<table class="table table-striped table-bordered" width="100%">';
					elem += '<thead>';
					elem += '<tr>';
					elem += '<th>Título do código</th>';
					elem += '<th><span class="dashicons dashicons-visibility" title="Nº de visualizações"></span></th>';
					elem += '<th><span class="dashicons dashicons-download" title="Nº de downloads"></span></th>';
					elem += '<th width="140px">Ações</th>';
					elem += '</tr>';		
					elem += '</thead>';
					elem += '<tbody>';					
					jQuery.each(data[0].codes, function(index, arrCodigo){
						elem += '<tr>';
						elem += '<td>' + arrCodigo.titulo + '</td>';
						elem += '<td>' + arrCodigo.visualizacoes + '</td>';
						elem += '<td>' + arrCodigo.downloads + '</td>';
						elem += '<td>';
						elem += '<div class="btn-group btn-group-sm" role="group" aria-label="Ações">';
						elem += '<button type="button" class="btn btn-primary" onclick="plugce_abrirCodigosEmbed(\'' + arrCodigo.id + '\')"><span class="dashicons dashicons-media-code" title="Ver código"></span></button>';
						elem += '<button type="button" class="btn btn-secondary" onclick="plugce_getDatasEmbed(\'' + idLivro + '\', \'' + arrCodigo.id + '\', \'1\')"><span class="dashicons dashicons-database" title="Dados recebidos"></span></button>';
						elem += '<button type="button" class="btn btn-danger" onclick="plugce_delEmbed(\'' + idLivro + '\', \'' + arrCodigo.id + '\')"><span class="dashicons dashicons-trash" title="Excluir"></span></button>';
						elem += '</div>';
						elem += '</td>';
						elem += '</tr>';
						
						/*Monta modal códigos*/
						if(jQuery('#myModal-codigos-' + arrCodigo.id).length > 0) {
							jQuery('#myModal-codigos-' + arrCodigo.id).remove();
						}
						modalCodigos  = '';
						modalCodigos += '<div id="myModal-codigos-' + arrCodigo.id + '" class="modal fade" tabindex="-1" aria-hidden="true">';
						modalCodigos += '<div class="modal-dialog modal-lg" role="document">';
						modalCodigos += '<div class="modal-content">';
						modalCodigos += '<div class="modal-header">';
						modalCodigos += '<h5 class="modal-title">Você pode utilizar qualquer um dos códigos abaixo</h5>';
						modalCodigos += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
						modalCodigos += '</div>';
						modalCodigos += '<div class="modal-body">';						
						modalCodigos += '<h6>Wordpress</h6>';
						modalCodigos += '<p>Copie o código abaixo e utilize no editor de páginas do Wordpress</p>';
						modalCodigos += '<div class="codigo">' + arrCodigo.codigos.plugin_wp + '</div>';
						modalCodigos += '<h6>iFrame</h6>';
						modalCodigos += '<p>Copie o código abaixo e utilize em qualquer página HTML</p>';
						modalCodigos += '<div class="codigo">' + arrCodigo.codigos.iframe + '</div>';
						modalCodigos += '<h6>Solicite dados para o download</h6>';
						modalCodigos += '<p>Você pode inclusive solicitar que a pessoa que deseja seu livro tenha que preencher dados* em um formulário, como nome e e-mail por exemplo. Quais dados serão solicitados podem ser definidos por você abaixo. Após o download do livro estes dados ficarão disponíveis para você fazer o download aqui na plataforma.</p>';
						modalCodigos += '<p>*Utilize estes dados para segmentar seu público e ser mais certeiro em suas campanhas de marketing.</p>';
						
						if(arrCodigo.campos == "" || arrCodigo.campos == "{\"label\":[\"\"]}") {						
							modalCodigos += '<a id="btn-cadastro-dados-' + arrCodigo.id + '" class="btn btn-sm btn-outline-secondary" onclick="plugce_informarCadastroDados(\'' + arrCodigo.id + '\')">Solicitar dados para download</a>';						
						} else {
							modalCodigos += '<a id="btn-cadastro-dados-' + arrCodigo.id + '" class="btn btn-sm btn-outline-secondary" onclick="plugce_informarCadastroDados(\'' + arrCodigo.id + '\')" style="display: none;">Solicitar dados para download</a>';						
						}
						
						modalCodigos += '<form id="form-dados-embed-' + arrCodigo.id + '" class="form-dados-embed" enctype="multipart/form-data" method="POST" onsubmit="return false" style="display: none;">';
						modalCodigos += '<label>Dados a serem solicitados para o download</label>';
						modalCodigos += '<div id="dados">';
						if(arrCodigo.campos == "" || arrCodigo.campos == "{\"label\":[\"\"]}") {
							modalCodigos += '<div class="dados">';              
							modalCodigos += '<input type="text" class="form-control" name="label[]" placeholder="Campo (Ex.: Nome, E-mail, etc)"/>';
							modalCodigos += '<div class="acoes">';
							modalCodigos += '<button type="button" class="btn btn-danger remove" onclick="plugce_removeLinhaCadastroManual(\'' + arrCodigo.id + '\', jQuery(this));" style="display: none;">';
                            modalCodigos += '<span class="dashicons dashicons-no" title="Remover dado"></span>';
							modalCodigos += '</button>';
							modalCodigos += '<button type="button" class="btn btn-success add" onclick="plugce_addLinhaCadastroManual(\'' + arrCodigo.id + '\', true);">';
                            modalCodigos += '<span class="dashicons dashicons-plus" title="Adicionar outro dado"></span>';
							modalCodigos += '</button>';
							modalCodigos += '</div>';
							modalCodigos += '</div>';
						} else {
							var labelsCads = obj = JSON.parse(arrCodigo.campos);
							jQuery.each(labelsCads.label, function(index, label){
								modalCodigos += '<div class="dados">';              
								modalCodigos += '<input type="text" class="form-control" name="label[]" placeholder="Campo (Ex.: Nome, E-mail, etc)" value="' + label + '"/>';
								modalCodigos += '<div class="acoes">';
								modalCodigos += '<button type="button" class="btn btn-danger remove" onclick="plugce_removeLinhaCadastroManual(\'' + arrCodigo.id + '\', jQuery(this));" style="display: none;">';
								modalCodigos += '<span class="dashicons dashicons-no" title="Remover dado"></span>';
								modalCodigos += '</button>';
								modalCodigos += '<button type="button" class="btn btn-success add" onclick="plugce_addLinhaCadastroManual(\'' + arrCodigo.id + '\', true);">';
								modalCodigos += '<span class="dashicons dashicons-plus" title="Adicionar outro dado"></span>';
								modalCodigos += '</button>';
								modalCodigos += '</div>';
								modalCodigos += '</div>';
							});
						}
						modalCodigos += '</div>';
						modalCodigos += '</form>';
						modalCodigos += '</div>';
						
						if(arrCodigo.campos == "" || arrCodigo.campos == "{\"label\":[\"\"]}") {
							modalCodigos += '<div class="modal-footer" style="display: none">';
						} else {
							modalCodigos += '<div class="modal-footer">';
						}
						modalCodigos += '<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Cancelar</button>';
						modalCodigos += '<button id="salvar" type="button" class="btn btn-primary" onclick="plugce_salvarDadosEmbed(\'' + idLivro + '\', \'' + arrCodigo.id + '\')">Salvar</button>';
						modalCodigos += '</div>';
						modalCodigos += '</div>';
						modalCodigos += '</div>';
						modalCodigos += '</div>';
						jQuery(modalCodigos).appendTo('.wrap'); 
					});
					elem += '</tbody>';
					elem += '</table>';				
				jQuery('.aplicacao .meus-livros #' + idLivro + '.livro .codigos-criados').html(elem);
			}
        }).fail(function() {
            plugce_solicitaLogin();
        });
    } else {
        plugce_solicitaLogin();
    }
}

function plugce_getDatasEmbed(idLivro, idEmbed, pag){
	if(plugce_getToken()) {
		plugce_openModal('myModal-dados');
		jQuery('#myModal-dados .modal-body').html('Consultando...');
		jQuery.ajax({
            type: "POST",
            url: plugce_urlBaseApi + "datas/list/V1/",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
            },
			data: {ebook: idLivro, embed: idEmbed, pag: pag}
        }).done(function(data) {
			if(data[0].downloads.length == 0){
				jQuery('#myModal-dados .modal-body').html('<p>Este código de incorporação ainda não teve downloads, portanto não há dados aqui.</p>');
			} else {
				var numPaginasTotais = data[0].totalPags;
				var pagAnterior = data[0].pag-1;
				var pagPosterior = data[0].pag+1;
				if(pagPosterior > numPaginasTotais){
					pagPosterior = 0;
				}
				var elem = '';
					elem += '<div class="table-responsive">';
				    elem += '<table class="table table-bordered table-striped table-sm" width="100%">';
					elem += '<thead>';
					elem += '<tr>';
					jQuery.each(data[0].labels, function(index, label){
						elem += '<th>' + label.replace(/_/g, " ") + '</th>';
					});
					elem += '</tr>';		
					elem += '</thead>';
					elem += '<tbody>';
					jQuery.each(data[0].downloads, function(index1, arrDownload){
						elem += '<tr>';
						jQuery.each(data[0].labels, function(index2, label){
							if(data[0].downloads[index1][label] != undefined) {
								elem += '<td>' + data[0].downloads[index1][label] + '</td>';
							} else {
								elem += '<td></td>';
							}
						});
						elem += '</tr>';
					});
					elem += '</tbody>';
					elem += '</table>';
					elem += '</div>';
					elem += '<div class="btn-toolbar" role="toolbar">';
					elem += '<div class="btn-group btn-group-sm mr-2" role="group">';
					if (pagAnterior > 0){
						elem += '<button type="button" class="btn btn-secondary" onclick="plugce_getDatasEmbed(\'' + idLivro + '\', \'' + idEmbed + '\', \'' + pagAnterior + '\')">';
						elem += '<span class="dashicons dashicons-arrow-left-alt2"></span> Mais recentes';
						elem += '</button>';
					}
					if (pagPosterior > 0){
						elem += '<button type="button" class="btn btn-secondary" onclick="plugce_getDatasEmbed(\'' + idLivro + '\', \'' + idEmbed + '\', \'' + pagPosterior + '\')">';
						elem += 'Anteriores <span class="dashicons dashicons-arrow-right-alt2"></span>';
						elem += '</button>';
					}
					elem += '</div>';
					elem += '<div class="btn-group" role="group">';
					elem += '<button id="btn-export-csv" type="button" class="btn btn-outline-secondary" onclick="plugce_exportDatasEmbed(\'' + idLivro + '\', \'' + idEmbed + '\')">';
					elem += 'Exportar CSV (Últimos 100 registros)';
					elem += '</button>';
					elem += '</div>';	
					elem += '</div>';					
				jQuery('#myModal-dados .modal-body').html(elem);
			}
        }).fail(function() {
            plugce_solicitaLogin();
        });
	} else {
        plugce_solicitaLogin();
    }	
}

function plugce_exportDatasEmbed(idLivro, idEmbed){
	jQuery('#btn-export-csv').html('Carregando...').attr('disabled','disabled');
	jQuery.ajax({
		type: "POST",
		url: plugce_urlBaseApi + "datas/export/V1/",
		dataType: 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
		},
		data: {ebook: idLivro, embed: idEmbed}
	}).done(function(data) {
		var b64 = data[0].fileBase64;
		b64 = b64.replace('data:text/csv;base64,','');
		jQuery('#myModal-dados #link-export').html('<a id="link-download-csv" download="dados_' + idLivro + '_' + idEmbed + '.csv" href="data:text/octet-stream;base64,' + b64 +'">Download</a>');
		jQuery('#link-download-csv')[0].click();
		jQuery('#btn-export-csv').html('Exportar CSV (Últimos 100 registros)').removeAttr('disabled');
	}).fail(function() {
		plugce_solicitaLogin();
	});
}

function plugce_abrirCodigosEmbed(idEmbed){
	plugce_openModal('myModal-codigos-' + idEmbed);
	if(jQuery('#myModal-codigos-' + idEmbed + ' #dados input:first-of-type').val() != ''){
		plugce_informarCadastroDados(idEmbed);
	}
}

function plugce_modalNovoEmbed(idLivro){
	plugce_openModal('myModal-novo-embed');
	jQuery('#myModal-novo-embed #titulo').val('');
	setTimeout(function(){
		jQuery('#myModal-novo-embed #titulo').focus();
	}, 500);
	jQuery('#myModal-novo-embed #salvar').attr('onclick','plugce_salvaNovoEmbed(\'' + idLivro + '\')');
}

function plugce_salvaNovoEmbed(idLivro){
	var titulo = jQuery('#myModal-novo-embed #titulo').val();
	if(titulo == ""){
		titulo = "Novo código de incorporação";
	}
	jQuery.ajax({
		type: "POST",
		url: plugce_urlBaseApi + "codes/create/V1/",
		dataType: 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
		},
		data: {ebook: idLivro, titulo: titulo}
	}).done(function(data) {
		plugce_getCodigosLivro(idLivro);
		if(data[0].newCode > 0) {
			alert('Código criado. Os códigos serão apresentados na próxima tela.');
			plugce_closeModal('myModal-novo-embed');
			setTimeout(function(){
				plugce_abrirCodigosEmbed(data[0].newCode);
			}, 2000);
		}
	}).fail(function() {
		plugce_solicitaLogin();
	});
}

function plugce_salvarDadosEmbed(idLivro, idEmbed){ 
	var labels = jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed).serialize();
	jQuery('#myModal-codigos-' + idEmbed + ' .modal-footer button#salvar').html('Salvando...');     
	jQuery.ajax({
		type: "POST",
		url: plugce_urlBaseApi + "codes/edit/V1/",
		dataType: 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
		},
		data: {ebook: idLivro, embed: idEmbed, labels: labels}
	}).done(function(data) {
		plugce_getCodigosLivro(idLivro);
		jQuery('#myModal-codigos-' + idEmbed + ' .modal-footer button#salvar').html('Salvar');
		plugce_closeModal('myModal-codigos-' + idEmbed);
	}).fail(function() {
		plugce_solicitaLogin();
	});
}

function plugce_informarCadastroDados(idEmbed){
	jQuery('#myModal-codigos-' + idEmbed + ' #btn-cadastro-dados-'+ idEmbed).hide();
	jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed).show();
	jQuery('#myModal-codigos-' + idEmbed + ' .modal-footer').show();
	plugce_botoesCadastroManual(idEmbed);
}

function plugce_botoesCadastroManual(idEmbed){
	jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed + ' .dados button.remove').show();
	jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed + ' .dados button.add').hide();
	jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed + ' .dados:last-of-type button.add').show();
}

function plugce_addLinhaCadastroManual(idEmbed, withFocus = true){
	if(!withFocus){
		if(jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed + ' .dados:last-of-type input[type=text]').val() == ""){
			return false;
		}
	}
	jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed + ' .dados:last-of-type').clone().appendTo('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed + ' #dados').find('input').val('');
	if(withFocus) {
		jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed + ' .dados:last-of-type input[type=text]').focus();
	}
	plugce_botoesCadastroManual(idEmbed);
}

function plugce_removeLinhaCadastroManual(idEmbed, elm){
	if(jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed + ' .dados').length == 1){
		jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed + ' .dados:last-of-type input[type=text]').val("");
		jQuery('#myModal-codigos-' + idEmbed + ' #btn-cadastro-dados-'+ idEmbed).show();
		jQuery('#myModal-codigos-' + idEmbed + ' #form-dados-embed-'+ idEmbed).hide();
	} else {
		jQuery(elm).parent().parent().remove();
	}
	plugce_botoesCadastroManual(idEmbed);
}

function plugce_delEmbed(idLivro, idEmbed){
	if(confirm('Tem certeza que deseja excluir este código? Ao excluir todos os dados fornecidos no download do livro também serão excluídos.')){
		jQuery.ajax({
			type: "POST",
			url: plugce_urlBaseApi + "codes/del/V1/",
			dataType: 'json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", "Basic " + plugce_getToken());
			},
			data: {ebook: idLivro, embed: idEmbed}
		}).done(function(data) {
			plugce_getCodigosLivro(idLivro);
		}).fail(function() {
			plugce_solicitaLogin();
		});
	}
}

function plugce_openModal(idmodal){
	jQuery('#' + idmodal).modal('show');
}

function plugce_closeModal(idmodal){
	jQuery('#' + idmodal).modal('hide');
}