









































- **Agiliza Escala**
- **Documento Geral**
- **Miguel Guerra**


**Sumário**

[**1. INTRODUÇÃO	**](#_toc168332432)

[**2. PROBLEMA	**](#_toc168332433)

[**3. NECESSIDADE DOS USUÁRIOS	**](#_toc168332434)

[**4. ESCOPO DO PRODUTO	**](#_toc168332436)

[**5. REQUISITOS FUNCIONAIS, NÃO-FUNCIONAIS E DOMÍNIO	**](#_toc168332437)





1. # <a name="_toc124563680"></a><a name="_toc402800080"></a><a name="_toc402800093"></a><a name="_toc168332432"></a>**Introdução**
   <a name="_toc124563683"></a><a name="_toc402800082"></a><a name="_toc402800095"></a><a name="_toc168332434"></a>   O Agiliza Escala é um sistema de gestão desenvolvido para automatizar a organização das escalas litúrgicas da Paróquia Sagrada Família. O objetivo é substituir processos manuais por uma solução digital que assegure eficiência e precisão na alocação de voluntários.
   ### 1\.1* Objetivos Principais
- **Gestão de Lideranças:** Cadastro centralizado de membros e suas disponibilidades.
- **Controle de Missas:** Planejamento de horários e requisitos técnicos de cada celebração.
- **Alocação Inteligente:** Cruzamento automático de dados para gerar escalas sem conflitos.
- **Exportação de Dados:** Geração de relatórios em formato Excel para facilitar a distribuição.
### 1\.2* Impacto Esperado
- A ferramenta visa reduzir a carga administrativa das lideranças pastorais, garantindo uma organização transparente, equilibrada e focada na missão comunitária.
1. # **Problema**
Atualmente, o processo de elaboração das escalas mensais é realizado de forma inteiramente manual. Esta metodologia implica em uma gestão fragmentada das disponibilidades dos membros e dos registros de celebrações, resultando em uma alocação individualizada de voluntários que demanda tempo excessivo e é suscetível a erros operacionais, como conflitos de agenda ou sobrecarga de determinados participantes.
1. ## **Necessidades dos usuários**

|<p><h4></h4></p><p><h4></h4></p><p><h4>**Requisitos Críticos (Essenciais para o funcionamento).**</h4></p>|<p>- Operações completas (CRUD - Criar, Ler, Atualizar e Excluir) para o cadastro de voluntários.</p><p>- Controle individualizado das janelas de horários e preferências de cada liderança para as missas.</p><p>- Operações completas (CRUD) do cronograma de celebrações paroquiais.</p><p>- Operações completas (CRUD) de registros de alocação de uma escala mensal específica.</p>|
| :- | :- |
|**Requisitos Importantes (Agregam muito valor)**|<p>- Fácil visualização das missas em formato de calendário/agenda.</p><p>- Geração automática das escalas respeitando os critérios de disponibilidade.</p>|
|<p><h4>**Requisitos Úteis (Agradável ao usuário)**</h4></p><p></p>|<p>- Exportar de escalas geradas em um arquivo de formato planilha.</p><p>&emsp;</p>|

1. # <a name="_toc124563701"></a><a name="_toc402800084"></a><a name="_toc402800097"></a><a name="_toc168332436"></a>**Escopo do Produto**
   <a name="_toc168332437"></a>O projeto Agiliza Escala consiste no desenvolvimento de uma plataforma web dedicada à automação e otimização das escalas litúrgicas da Paróquia Sagrada Família.

   O sistema centraliza o cadastro de lideranças, o mapeamento de disponibilidades e a gestão do cronograma de celebrações. Por meio de um algoritmo de alocação, a solução processa os dados de entrada para gerar escalas inteligentes, apresentadas em interface de calendário e com suporte a ajustes manuais por administradores para refinamento da escala.
   ### 4\.1 Funcionalidades Abrangentes:
- **Gestão de Dados:** Módulos de registro de lideranças e parâmetros de missas.
- **Inteligência de Alocação:** Distribuição automática de voluntários baseada em regras de disponibilidade.
- **Exportação e Relatórios:** Geração de arquivos em planilha (Excel) para distribuição entre os membros da Paróquia.
- **Controle de Ajustes:** Interface para edição manual de escalas geradas, garantindo autonomia à coordenação.
  2. ### ` `Limites do Projeto (Exclusões):
Para manter o foco no objetivo central, o escopo **não contempla**:

- Integração com ERPs externos ou sistemas legados de gestão paroquial.
- Módulos de gestão financeira, dízimo ou tesouraria.
























1. # **Requisitos funcionais, não-funcionais e domínio**
   5\.1 Requisitos funcionais

|<h2>ID</h2>|<h2>Descrição</h2>|
| - | - |
|<h2>RF01 </h2>|<h2>O sistema deve permitir o cadastro de lideranças, incluindo nome, contato e horários de missa disponíveis.</h2>|
|<h2>RF02 </h2>|<h2>O sistema deve permitir o cadastro das datas e horários das missas.</h2>|
|<h2>RF03 </h2>|<h2>O sistema deve permitir que os coordenadores registrem a disponibilidade de horários das lideranças para o mês.</h2>|
|<h2>RF04 </h2>|<h2>O sistema deve alocar automaticamente as lideranças nas missas com base na disponibilidade registrada.</h2>|
|<h2>RF05 </h2>|<h2>O sistema deve permitir a exportação da escala para um arquivo Excel.</h2>|
|<h2>RF06.</h2>|<h2>O sistema deve permitir a visualização das missas do mês atual em formato de calendário</h2>|
|<h2>RF07 </h2>|<h2>O sistema deve permitir editar ou excluir cadastros de lideranças.</h2>|
|<h2>RF08 </h2>|<h2>O sistema deve permitir editar ou excluir cadastros de missas.</h2>|
|<h2>RF10 </h2>|<h2>O sistema deve permitir que o coordenador ajuste manualmente a escala gerada automaticamente.</h2>|

5\.2 REQUISITOS NÃO-FUNCIONAIS

|ID |Descrição|
| :- | :- |
|RNF01 |O sistema deve ser de fácil uso, com interface intuitiva para usuários com pouca familiaridade com tecnologia.|
|RNF02|O sistema deve ser acessível via navegador web, sem necessidade de instalação.|
|RNF03|O sistema deve adaptar seu layout automaticamente para diferentes tamanhos de tela.|
|RNF04|O sistema deve garantir que uma Pastoral não consiga visualizar ou editar dados de outra Pastoral (Isolamento de Dados).|
|RNF05|O sistema deve implementar uma camada de proteção que impeça usuários não autenticados de acessar áreas administrativas.|

5\.3 REQUISITOS DE DOMÍNIO 

|ID |Descrição|
| :- | :- |
|RD01 |Uma liderança só pode ser alocada em uma missa se tiver disponibilidade no horário.|
|RD02 |Cada missa deve ter pelo menos seis lideranças alocadas.|
|RD03 |Lideranças não podem ser alocadas em mais de uma missa no mesmo horário.|
|RD04|As lideranças só podem ser alocadas até, no máximo, a quantidade de vezes que pediram para os coordenadores. |
|RD05|Durante o registro das lideranças, o usuário pode inserir os dias que a liderança pode ou os dias que não pode.|
|RD06|Um coordenador logado na Paróquia A nunca deve visualizar ou editar lideranças ou missas da Paróquia B.|
|RD07|Não deve ser permitido cria uma missa de data anterior ao dia atual, garantindo que o histórico da paróquia seja preservado sem alterações retroativas acidentais.|



##


