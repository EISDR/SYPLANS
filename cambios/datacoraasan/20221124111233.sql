/*
PostgreSQL Backup
Database: db_syplans/public
Backup Time: 2022-11-24 11:14:16
*/

DROP TABLE IF EXISTS "public"."a_clone_group";
DROP TABLE IF EXISTS "public"."aaa_default";
DROP TABLE IF EXISTS "public"."aaa_default_detail";
DROP TABLE IF EXISTS "public"."aaa_default_pivot";
DROP TABLE IF EXISTS "public"."aaa_ejecutadora";
DROP TABLE IF EXISTS "public"."aaa_poa - indicadores productos";
DROP TABLE IF EXISTS "public"."actividades_apoyo";
DROP TABLE IF EXISTS "public"."actividades_apoyo_estatus";
DROP TABLE IF EXISTS "public"."actividades_poa";
DROP TABLE IF EXISTS "public"."actividades_poa_estatus";
DROP TABLE IF EXISTS "public"."actividades_poa_involucrado";
DROP TABLE IF EXISTS "public"."alerta";
DROP TABLE IF EXISTS "public"."api";
DROP TABLE IF EXISTS "public"."asignacion_especial_poa";
DROP TABLE IF EXISTS "public"."asignacion_especial_poa_estatus";
DROP TABLE IF EXISTS "public"."auditoria_comentarios";
DROP TABLE IF EXISTS "public"."auditoria_entidad_flujo";
DROP TABLE IF EXISTS "public"."auditoria_informe";
DROP TABLE IF EXISTS "public"."auditoria_lista_correctiva";
DROP TABLE IF EXISTS "public"."auditoria_lista_correctiva_departamento";
DROP TABLE IF EXISTS "public"."auditoria_lista_correctiva_responsable";
DROP TABLE IF EXISTS "public"."auditoria_lista_preventiva";
DROP TABLE IF EXISTS "public"."auditoria_lista_status";
DROP TABLE IF EXISTS "public"."auditoria_programa";
DROP TABLE IF EXISTS "public"."auditoria_programa_estatus";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_action";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_action_function";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_action_permitido";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_action_rol";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_departamento";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_documentos_asociados";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_documentos_asociados_estatus";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_documentos_asociados_listaverificacion";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_documentos_asociados_responsables";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_equipotrabajo";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_estatus";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_estatus_permitido";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_estatus_rol";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_function_permitido";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_function_rol";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_participantes";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_prioridad";
DROP TABLE IF EXISTS "public"."auditoria_programa_plan_proceso";
DROP TABLE IF EXISTS "public"."auditoria_solicitud";
DROP TABLE IF EXISTS "public"."auditoria_solicitud_proceso";
DROP TABLE IF EXISTS "public"."auditoria_solicitud_status";
DROP TABLE IF EXISTS "public"."builder";
DROP TABLE IF EXISTS "public"."caracteristica";
DROP TABLE IF EXISTS "public"."caracteristica_indicador";
DROP TABLE IF EXISTS "public"."caracteristica_indicador_actividad";
DROP TABLE IF EXISTS "public"."caracteristica_indicador_generico";
DROP TABLE IF EXISTS "public"."caracteristica_indicador_pei";
DROP TABLE IF EXISTS "public"."caracteristica_indicador_poa";
DROP TABLE IF EXISTS "public"."caracteristica_indicador_proceso";
DROP TABLE IF EXISTS "public"."caracteristica_indicador_producto";
DROP TABLE IF EXISTS "public"."cargo";
DROP TABLE IF EXISTS "public"."catalogo_bienes_servicios";
DROP TABLE IF EXISTS "public"."catalogo_bienes_servicios_auxiliar";
DROP TABLE IF EXISTS "public"."categoria_alerta";
DROP TABLE IF EXISTS "public"."centro_costo";
DROP TABLE IF EXISTS "public"."clasificadores";
DROP TABLE IF EXISTS "public"."clasificadores_bk";
DROP TABLE IF EXISTS "public"."clientes_compromisos";
DROP TABLE IF EXISTS "public"."clientes_institucion";
DROP TABLE IF EXISTS "public"."code_generator";
DROP TABLE IF EXISTS "public"."comentarios";
DROP TABLE IF EXISTS "public"."compania";
DROP TABLE IF EXISTS "public"."compromiso";
DROP TABLE IF EXISTS "public"."configuracion";
DROP TABLE IF EXISTS "public"."copy_config";
DROP TABLE IF EXISTS "public"."cuenta";
DROP TABLE IF EXISTS "public"."denominacion_pnpsp";
DROP TABLE IF EXISTS "public"."departamento";
DROP TABLE IF EXISTS "public"."direcciones_area";
DROP TABLE IF EXISTS "public"."direcciones_generales";
DROP TABLE IF EXISTS "public"."documental";
DROP TABLE IF EXISTS "public"."documental_file";
DROP TABLE IF EXISTS "public"."documento_externo";
DROP TABLE IF EXISTS "public"."documentos_asociados";
DROP TABLE IF EXISTS "public"."documentos_asociados_relacionado";
DROP TABLE IF EXISTS "public"."documentos_asociados_status";
DROP TABLE IF EXISTS "public"."eje_estrategico";
DROP TABLE IF EXISTS "public"."eje_estrategico_end";
DROP TABLE IF EXISTS "public"."eje_estrategico_ods";
DROP TABLE IF EXISTS "public"."eje_estrategico_pnpsp";
DROP TABLE IF EXISTS "public"."end";
DROP TABLE IF EXISTS "public"."entity";
DROP TABLE IF EXISTS "public"."estrategia";
DROP TABLE IF EXISTS "public"."estrategia_foda";
DROP TABLE IF EXISTS "public"."estrategia_objetivo_especifico";
DROP TABLE IF EXISTS "public"."estrategia_pesta";
DROP TABLE IF EXISTS "public"."estrategia_tratamiento";
DROP TABLE IF EXISTS "public"."estructura_programatica";
DROP TABLE IF EXISTS "public"."evaluacion_pei";
DROP TABLE IF EXISTS "public"."evaluacion_poa";
DROP TABLE IF EXISTS "public"."evento_indicador";
DROP TABLE IF EXISTS "public"."evento_indicador_relacion";
DROP TABLE IF EXISTS "public"."evento_indicador_urgencia";
DROP TABLE IF EXISTS "public"."evento_riesgo_generico";
DROP TABLE IF EXISTS "public"."evento_tipo";
DROP TABLE IF EXISTS "public"."filemanager";
DROP TABLE IF EXISTS "public"."foda";
DROP TABLE IF EXISTS "public"."foda_items";
DROP TABLE IF EXISTS "public"."foda_type";
DROP TABLE IF EXISTS "public"."fuente_financiamiento";
DROP TABLE IF EXISTS "public"."gasby";
DROP TABLE IF EXISTS "public"."hijo";
DROP TABLE IF EXISTS "public"."history";
DROP TABLE IF EXISTS "public"."iconos";
DROP TABLE IF EXISTS "public"."impacto_politica";
DROP TABLE IF EXISTS "public"."import_actions";
DROP TABLE IF EXISTS "public"."import_entity";
DROP TABLE IF EXISTS "public"."import_entity_fields";
DROP TABLE IF EXISTS "public"."indicador_actividad";
DROP TABLE IF EXISTS "public"."indicador_actividad_periodo";
DROP TABLE IF EXISTS "public"."indicador_generico";
DROP TABLE IF EXISTS "public"."indicador_generico_entidad";
DROP TABLE IF EXISTS "public"."indicador_generico_periodo";
DROP TABLE IF EXISTS "public"."indicador_pacc";
DROP TABLE IF EXISTS "public"."indicador_pacc_periodo";
DROP TABLE IF EXISTS "public"."indicador_pei";
DROP TABLE IF EXISTS "public"."indicador_pei_ano";
DROP TABLE IF EXISTS "public"."indicador_poa";
DROP TABLE IF EXISTS "public"."indicador_poa_periodo";
DROP TABLE IF EXISTS "public"."indicador_proceso";
DROP TABLE IF EXISTS "public"."indicador_proceso_periodo";
DROP TABLE IF EXISTS "public"."indicador_producto";
DROP TABLE IF EXISTS "public"."indicador_producto_periodo";
DROP TABLE IF EXISTS "public"."indicador_producto_poa";
DROP TABLE IF EXISTS "public"."indicador_resultado_pei";
DROP TABLE IF EXISTS "public"."institucion";
DROP TABLE IF EXISTS "public"."involucrados";
DROP TABLE IF EXISTS "public"."involucrados_tipo";
DROP TABLE IF EXISTS "public"."linea_accion";
DROP TABLE IF EXISTS "public"."linea_accion_politica";
DROP TABLE IF EXISTS "public"."login_history";
DROP TABLE IF EXISTS "public"."mapa_proceso";
DROP TABLE IF EXISTS "public"."marco_estrategico";
DROP TABLE IF EXISTS "public"."marco_estrategico_valores";
DROP TABLE IF EXISTS "public"."marco_estrategicos_virtudes";
DROP TABLE IF EXISTS "public"."marco_legal";
DROP TABLE IF EXISTS "public"."mepydfiles";
DROP TABLE IF EXISTS "public"."mepydreports";
DROP TABLE IF EXISTS "public"."mods";
DROP TABLE IF EXISTS "public"."moneda";
DROP TABLE IF EXISTS "public"."notificacion";
DROP TABLE IF EXISTS "public"."notificacion_rol";
DROP TABLE IF EXISTS "public"."objetivo";
DROP TABLE IF EXISTS "public"."objetivo_end";
DROP TABLE IF EXISTS "public"."objetivo_especifico";
DROP TABLE IF EXISTS "public"."objetivo_estrategico";
DROP TABLE IF EXISTS "public"."objetivo_estrategico_especifico";
DROP TABLE IF EXISTS "public"."objetivo_estrategico_oe_end";
DROP TABLE IF EXISTS "public"."objetivo_estrategico_politica_gobierno";
DROP TABLE IF EXISTS "public"."objetivo_estrategico_productos_terminales";
DROP TABLE IF EXISTS "public"."ods";
DROP TABLE IF EXISTS "public"."ods_config";
DROP TABLE IF EXISTS "public"."organo_publico";
DROP TABLE IF EXISTS "public"."otros_compromiso";
DROP TABLE IF EXISTS "public"."pacc";
DROP TABLE IF EXISTS "public"."pacc_auditoria";
DROP TABLE IF EXISTS "public"."pacc_departamental";
DROP TABLE IF EXISTS "public"."pacc_departamental_detail";
DROP TABLE IF EXISTS "public"."pacc_departamental_detail_version";
DROP TABLE IF EXISTS "public"."pacc_departamental_version";
DROP TABLE IF EXISTS "public"."pacc_departamento_status";
DROP TABLE IF EXISTS "public"."pacc_departamento_status_before";
DROP TABLE IF EXISTS "public"."pacc_departamento_status_next";
DROP TABLE IF EXISTS "public"."pacc_status";
DROP TABLE IF EXISTS "public"."pacc_status_before";
DROP TABLE IF EXISTS "public"."pacc_status_next";
DROP TABLE IF EXISTS "public"."pacc_version";
DROP TABLE IF EXISTS "public"."pei";
DROP TABLE IF EXISTS "public"."pei_estatus";
DROP TABLE IF EXISTS "public"."pei_poa";
DROP TABLE IF EXISTS "public"."periodo";
DROP TABLE IF EXISTS "public"."persona";
DROP TABLE IF EXISTS "public"."pesta";
DROP TABLE IF EXISTS "public"."pesta_items";
DROP TABLE IF EXISTS "public"."pesta_type";
DROP TABLE IF EXISTS "public"."plan_base";
DROP TABLE IF EXISTS "public"."plan_modules";
DROP TABLE IF EXISTS "public"."plan_modules_negative";
DROP TABLE IF EXISTS "public"."plan_modules_required";
DROP TABLE IF EXISTS "public"."plan_precio";
DROP TABLE IF EXISTS "public"."plan_precio_descuento";
DROP TABLE IF EXISTS "public"."plan_precio_frecuencia";
DROP TABLE IF EXISTS "public"."plan_transaccion";
DROP TABLE IF EXISTS "public"."plan_transaccion_estatus";
DROP TABLE IF EXISTS "public"."plataforma_financiera";
DROP TABLE IF EXISTS "public"."pnpsp";
DROP TABLE IF EXISTS "public"."poa";
DROP TABLE IF EXISTS "public"."poa_estatus";
DROP TABLE IF EXISTS "public"."poa_monitoreo";
DROP TABLE IF EXISTS "public"."politica_denominacion_pnpsp";
DROP TABLE IF EXISTS "public"."politica_gobierno";
DROP TABLE IF EXISTS "public"."presupuesto_aprobado";
DROP TABLE IF EXISTS "public"."presupuesto_aprobado_estatus";
DROP TABLE IF EXISTS "public"."procedimiento_seleccion";
DROP TABLE IF EXISTS "public"."procesos";
DROP TABLE IF EXISTS "public"."procesos_categoria";
DROP TABLE IF EXISTS "public"."procesos_elemento";
DROP TABLE IF EXISTS "public"."procesos_status";
DROP TABLE IF EXISTS "public"."productos_poa";
DROP TABLE IF EXISTS "public"."productos_poa_status";
DROP TABLE IF EXISTS "public"."proyecto_actividad";
DROP TABLE IF EXISTS "public"."proyecto_actividad_apoyo";
DROP TABLE IF EXISTS "public"."proyecto_actividad_estatus";
DROP TABLE IF EXISTS "public"."proyecto_actividad_mods";
DROP TABLE IF EXISTS "public"."proyecto_estatus";
DROP TABLE IF EXISTS "public"."proyecto_item";
DROP TABLE IF EXISTS "public"."proyecto_item_actividad";
DROP TABLE IF EXISTS "public"."proyecto_item_involucrado";
DROP TABLE IF EXISTS "public"."proyecto_item_ods";
DROP TABLE IF EXISTS "public"."prudcto_involucrado";
DROP TABLE IF EXISTS "public"."razon";
DROP TABLE IF EXISTS "public"."reporte_indicador_config";
DROP TABLE IF EXISTS "public"."reporte_tipometa_formula";
DROP TABLE IF EXISTS "public"."responsable";
DROP TABLE IF EXISTS "public"."responsable_tipo";
DROP TABLE IF EXISTS "public"."resultado";
DROP TABLE IF EXISTS "public"."resultado_compromiso";
DROP TABLE IF EXISTS "public"."resultado_denominacion_pnpsp";
DROP TABLE IF EXISTS "public"."resultado_linea_accion";
DROP TABLE IF EXISTS "public"."resultado_mods";
DROP TABLE IF EXISTS "public"."resultado_otros_compromisos";
DROP TABLE IF EXISTS "public"."resultado_supuesto";
DROP TABLE IF EXISTS "public"."riesgo";
DROP TABLE IF EXISTS "public"."riesgo_a";
DROP TABLE IF EXISTS "public"."riesgo_control";
DROP TABLE IF EXISTS "public"."riesgo_entidad";
DROP TABLE IF EXISTS "public"."riesgo_estatus";
DROP TABLE IF EXISTS "public"."riesgo_historico";
DROP TABLE IF EXISTS "public"."riesgo_impacto";
DROP TABLE IF EXISTS "public"."riesgo_mamfe_estatus";
DROP TABLE IF EXISTS "public"."riesgo_matriz";
DROP TABLE IF EXISTS "public"."riesgo_matriz_control";
DROP TABLE IF EXISTS "public"."riesgo_matriz_model";
DROP TABLE IF EXISTS "public"."riesgo_probabilidad";
DROP TABLE IF EXISTS "public"."riesgo_resultado";
DROP TABLE IF EXISTS "public"."riesgo_resultado_amfe";
DROP TABLE IF EXISTS "public"."sec_eje_sectorial";
DROP TABLE IF EXISTS "public"."sec_eje_sectorial_end_borrada";
DROP TABLE IF EXISTS "public"."sec_objetivo_sectorial";
DROP TABLE IF EXISTS "public"."sec_objetivo_sectorial_eje_estrategico";
DROP TABLE IF EXISTS "public"."sec_objetivo_sectorial_end_borrada";
DROP TABLE IF EXISTS "public"."sec_productos_terminales_borrada";
DROP TABLE IF EXISTS "public"."sec_productos_terminales_estatus_borrada";
DROP TABLE IF EXISTS "public"."sec_productos_terminales_involucrados_borrada";
DROP TABLE IF EXISTS "public"."sec_productos_terminales_responsable_borrada";
DROP TABLE IF EXISTS "public"."sec_programa_sectorial";
DROP TABLE IF EXISTS "public"."sec_programa_sectorial_eje_estrategico";
DROP TABLE IF EXISTS "public"."sec_programa_sectorial_estatus";
DROP TABLE IF EXISTS "public"."sec_programa_sectorial_finazas";
DROP TABLE IF EXISTS "public"."sec_programa_sectorial_involucrados";
DROP TABLE IF EXISTS "public"."sec_programa_sectorial_objetivo_especifico";
DROP TABLE IF EXISTS "public"."sec_programa_sectorial_responsable";
DROP TABLE IF EXISTS "public"."sec_resultado_sectorial";
DROP TABLE IF EXISTS "public"."sec_resultado_sectorial_end_borrada";
DROP TABLE IF EXISTS "public"."sec_resultado_sectorial_estatus";
DROP TABLE IF EXISTS "public"."sec_resultado_sectorial_involucrados";
DROP TABLE IF EXISTS "public"."sec_resultado_sectorial_responsable";
DROP TABLE IF EXISTS "public"."sector";
DROP TABLE IF EXISTS "public"."ser_salida";
DROP TABLE IF EXISTS "public"."ser_salida_comentario";
DROP TABLE IF EXISTS "public"."ser_salida_estatus";
DROP TABLE IF EXISTS "public"."ser_salida_tipo";
DROP TABLE IF EXISTS "public"."ser_servicio";
DROP TABLE IF EXISTS "public"."ser_tipo_servicio";
DROP TABLE IF EXISTS "public"."solicitud_documento";
DROP TABLE IF EXISTS "public"."solicitud_documento_actividades";
DROP TABLE IF EXISTS "public"."solicitud_documento_area";
DROP TABLE IF EXISTS "public"."solicitud_documento_tipo_accion";
DROP TABLE IF EXISTS "public"."solicitud_proceso";
DROP TABLE IF EXISTS "public"."supuestos";
DROP TABLE IF EXISTS "public"."supuestos_tipo";
DROP TABLE IF EXISTS "public"."temporalgasby";
DROP TABLE IF EXISTS "public"."ticket";
DROP TABLE IF EXISTS "public"."ticket_estatus";
DROP TABLE IF EXISTS "public"."ticket_respuesta";
DROP TABLE IF EXISTS "public"."ticket_type";
DROP TABLE IF EXISTS "public"."tipo_accion";
DROP TABLE IF EXISTS "public"."tipo_auditores";
DROP TABLE IF EXISTS "public"."tipo_auditorias";
DROP TABLE IF EXISTS "public"."tipo_comentario";
DROP TABLE IF EXISTS "public"."tipo_compromiso";
DROP TABLE IF EXISTS "public"."tipo_cuenta";
DROP TABLE IF EXISTS "public"."tipo_documento";
DROP TABLE IF EXISTS "public"."tipo_inconformidad";
DROP TABLE IF EXISTS "public"."tipo_institucion";
DROP TABLE IF EXISTS "public"."tipo_inversion";
DROP TABLE IF EXISTS "public"."tipo_procedimiento";
DROP TABLE IF EXISTS "public"."tipo_razon";
DROP TABLE IF EXISTS "public"."tipo_resultado";
DROP TABLE IF EXISTS "public"."tipo_riesgo";
DROP TABLE IF EXISTS "public"."tipo_rol_auditores";
DROP TABLE IF EXISTS "public"."usuario";
DROP TABLE IF EXISTS "public"."usuario_copy1";
DROP TABLE IF EXISTS "public"."usuario_departamento";
DROP TABLE IF EXISTS "public"."value_value";
DROP TABLE IF EXISTS "public"."viceministerios";
DROP TABLE IF EXISTS "public"."viewcache";
DROP TABLE IF EXISTS "public"."viewcache_history";
DROP TABLE IF EXISTS "public"."vw_sectorial_tem";
DROP TABLE IF EXISTS "public"."ws_connection";
DROP TABLE IF EXISTS "public"."ws_connection_field";
DROP TABLE IF EXISTS "public"."ws_periods";
CREATE TABLE "a_clone_group" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "active" int2,
  "caracteristica" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(4000) COLLATE "pg_catalog"."default",
  "homePage" varchar(200) COLLATE "pg_catalog"."default",
  "isAdmin" int2,
  "name" varchar(1000) COLLATE "pg_catalog"."default",
  "user_updated" int4,
  "notificaciones" int2,
  "gracia" int4,
  "repeat" int4,
  "user_created" int4
)
;
ALTER TABLE "a_clone_group" OWNER TO "user_sysplans";
CREATE TABLE "aaa_default" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "aaa_default" OWNER TO "user_sysplans";
CREATE TABLE "aaa_default_detail" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "x_id" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "aaa_default_detail" OWNER TO "user_sysplans";
CREATE TABLE "aaa_default_pivot" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "X_id" int4,
  "Y_id" int4
)
;
ALTER TABLE "aaa_default_pivot" OWNER TO "user_sysplans";
CREATE TABLE "aaa_ejecutadora" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
)
)
;
ALTER TABLE "aaa_ejecutadora" OWNER TO "user_sysplans";
CREATE TABLE "aaa_poa - indicadores productos" (
  "Indicador" text COLLATE "pg_catalog"."default",
  "Departamento (*)" text COLLATE "pg_catalog"."default",
  "Producto (*)" text COLLATE "pg_catalog"."default",
  "Fuente del indicador" text COLLATE "pg_catalog"."default",
  "Método de cálculo" text COLLATE "pg_catalog"."default",
  "Tipo de meta (*)" text COLLATE "pg_catalog"."default",
  "Dirección de la meta (*)" text COLLATE "pg_catalog"."default",
  "Año Línea Base (*)" text COLLATE "pg_catalog"."default",
  "Línea base" text COLLATE "pg_catalog"."default",
  "Medio de verificación" text COLLATE "pg_catalog"."default",
  "Observación" text COLLATE "pg_catalog"."default",
  "Desagregación demográfica y geográfica" text COLLATE "pg_catalog"."default",
  "Trimestre 1" text COLLATE "pg_catalog"."default",
  "Trimestre 2" text COLLATE "pg_catalog"."default",
  "Trimestre 3" text COLLATE "pg_catalog"."default",
  "Trimestre 4" text COLLATE "pg_catalog"."default",
  "Inidicador PEI" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "aaa_poa - indicadores productos" OWNER TO "user_sysplans";
CREATE TABLE "actividades_apoyo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "actividades_poa" int4,
  "estatus" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "departamento" int4,
  "fecha_inicio" date,
  "fecha_fin" date,
  "responsable" int4,
  "tempid" varchar(200) COLLATE "pg_catalog"."default",
  "departamento_solicitante" int4,
  "presupuesto" numeric(18,2),
  "razon" int4,
  "tipo_inversion" int4,
  "maneja_presupuesto" int2,
  "calificacion" varchar(255) COLLATE "pg_catalog"."default",
  "clasificador_id" int4,
  "maneja_presupuesto_act_apoyo" int4,
  "cantidad_completa" int4,
  "bienes_permiso" varchar(1000) COLLATE "pg_catalog"."default",
  "presupuestario" varchar(1000) COLLATE "pg_catalog"."default",
  "bienes_permiso_nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "presupuestario_nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "presupuesto_consumido" numeric(18,2),
  "avance_porcentaje" numeric(18,2)
)
;
ALTER TABLE "actividades_apoyo" OWNER TO "user_sysplans";
CREATE TABLE "actividades_apoyo_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "actividades_apoyo_estatus" OWNER TO "user_sysplans";
CREATE TABLE "actividades_poa" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "poa" int4,
  "producto" int4,
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "fecha_inicio" date,
  "fecha_fin" date,
  "responsable" int4,
  "presupuesto" numeric(18,2),
  "presupuesto_consumido" numeric(18,2),
  "completa" int2,
  "comentario" text COLLATE "pg_catalog"."default",
  "razon" int4,
  "estatus" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "originalid" int4,
  "departamento" int4,
  "tipo_inversion" int4,
  "maneja_presupuesto" int2,
  "order_at" int4,
  "calificacion" varchar(255) COLLATE "pg_catalog"."default",
  "presupuesto_proyectado" int4,
  "cantidad_completa" int4,
  "bienes_permiso" varchar(1000) COLLATE "pg_catalog"."default",
  "presupuestario" varchar(1000) COLLATE "pg_catalog"."default",
  "bienes_permiso_nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "presupuestario_nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "avance_porcentaje" numeric(18,2),
  "tempid" varchar(1000) COLLATE "pg_catalog"."default",
  "show_dept" varchar(255) COLLATE "pg_catalog"."default",
  "show_prod" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "actividades_poa" OWNER TO "user_sysplans";
CREATE TABLE "actividades_poa_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "porcentaje" int4,
  "order_at" int4
)
;
ALTER TABLE "actividades_poa_estatus" OWNER TO "user_sysplans";
CREATE TABLE "actividades_poa_involucrado" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "actividad" int4,
  "involucrado" int4
)
;
ALTER TABLE "actividades_poa_involucrado" OWNER TO "user_sysplans";
CREATE TABLE "alerta" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "configuracion" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "key" varchar(15) COLLATE "pg_catalog"."default",
  "categoria" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "alerta" OWNER TO "user_sysplans";
CREATE TABLE "api" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "api" OWNER TO "user_sysplans";
CREATE TABLE "asignacion_especial_poa" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "poa" int4,
  "departamento_solicitante" int4,
  "departamento_solicitado" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "fecha_inicio" date,
  "fecha_fin" date,
  "responsable" int4,
  "completa" int2,
  "razon" int4,
  "comentario" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "originalid" int4,
  "estatus" int4
)
;
ALTER TABLE "asignacion_especial_poa" OWNER TO "user_sysplans";
CREATE TABLE "asignacion_especial_poa_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "porcentaje" int4,
  "order_at" int4
)
;
ALTER TABLE "asignacion_especial_poa_estatus" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_comentarios" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "auditoria" int4,
  "participante" int4,
  "puntodevista" text COLLATE "pg_catalog"."default",
  "recomendaciones" text COLLATE "pg_catalog"."default",
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "departamento" int4
)
;
ALTER TABLE "auditoria_comentarios" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_entidad_flujo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "controller" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "auditoria_entidad_flujo" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_informe" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "auditoria" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "fecha" timestamp(6),
  "secuencia" int4,
  "creadopor" int4,
  "creadoen" timestamp(6),
  "aprobadopor" int4,
  "aprobadoen" timestamp(6),
  "recomendaciones" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "auditoria_informe" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_lista_correctiva" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "elemento" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "departamento" int4,
  "responsable" int4,
  "ejecucion" timestamp(6),
  "estatus" int4,
  "riesgo" int4,
  "fecha_inicio" timestamp(6),
  "fecha_fin" timestamp(6),
  "accion_implantada" text COLLATE "pg_catalog"."default",
  "presupuesto" numeric(18,2),
  "evento_riesgo" int4
)
;
ALTER TABLE "auditoria_lista_correctiva" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_lista_correctiva_departamento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "auditoria_lista_correctiva" int4,
  "departamento" int4
)
;
ALTER TABLE "auditoria_lista_correctiva_departamento" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_lista_correctiva_responsable" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "auditoria_lista_correctiva" int4,
  "responsable" int4
)
;
ALTER TABLE "auditoria_lista_correctiva_responsable" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_lista_preventiva" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "elemento" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "departamento" int4,
  "responsable" int4,
  "ejecucion" timestamp(6),
  "estatus" int4,
  "riesgo" int4,
  "fecha_inico" timestamp(6),
  "fecha_fin" timestamp(6),
  "accion_implantada" text COLLATE "pg_catalog"."default",
  "evento_riesgo" int4
)
;
ALTER TABLE "auditoria_lista_preventiva" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_lista_status" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "auditoria_lista_status" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "estatus" int4,
  "fecha_inicio" timestamp(6),
  "fecha_fin" timestamp(6),
  "poa" int4
)
;
ALTER TABLE "auditoria_programa" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "auditoria_programa_estatus" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "auditoria_programa" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "fecha_inicio" timestamp(6),
  "fecha_fin" timestamp(6),
  "objetivo" text COLLATE "pg_catalog"."default",
  "alcance" text COLLATE "pg_catalog"."default",
  "estatus" int4,
  "elaborado_por" int4,
  "autorizado_por" int4,
  "elaborado_en" timestamp(6),
  "autorizado_en" timestamp(6),
  "tipo_auditoria" int4,
  "active" int2,
  "recomendaciones" text COLLATE "pg_catalog"."default",
  "comentarios" text COLLATE "pg_catalog"."default",
  "comentarios_auditor" text COLLATE "pg_catalog"."default",
  "prioridad" int4,
  "criterio" text COLLATE "pg_catalog"."default",
  "estatus_plan_accion" int4,
  "comentolider" int4,
  "comentoparticipante" int4,
  "auditoria_relacionada" int4
)
;
ALTER TABLE "auditoria_programa_plan" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_action" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "entidad" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "auditoria_programa_plan_action" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_action_function" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "actionid" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "addconditions" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "auditoria_programa_plan_action_function" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_action_permitido" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1
),
  "estatus_permitido" int4,
  "plan_status" int4
)
;
ALTER TABLE "auditoria_programa_plan_action_permitido" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_action_rol" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1
),
  "rol" int4,
  "plan_status" int4
)
;
ALTER TABLE "auditoria_programa_plan_action_rol" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_departamento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_plan" int4,
  "departamento" int4
)
;
ALTER TABLE "auditoria_programa_plan_departamento" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_documentos_asociados" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_plan" int4,
  "documento_asociado" int4,
  "observaciones" text COLLATE "pg_catalog"."default",
  "estatus" int4,
  "trabajado" int4,
  "original" int4
)
;
ALTER TABLE "auditoria_programa_plan_documentos_asociados" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_documentos_asociados_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "auditoria_programa_plan_documentos_asociados_estatus" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_documentos_asociados_listaverificacion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_plan_documentos_asociados" int4,
  "tempid" varchar(500) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "cumple" int2,
  "observaciones" varchar(8000) COLLATE "pg_catalog"."default",
  "acciones_correctivas" text COLLATE "pg_catalog"."default",
  "tipo_inconformidad" int4,
  "auditoria_relacionada" int4
)
;
ALTER TABLE "auditoria_programa_plan_documentos_asociados_listaverificacion" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_documentos_asociados_responsables" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_plan_documentos_asociados" int4,
  "usuario" int4
)
;
ALTER TABLE "auditoria_programa_plan_documentos_asociados_responsables" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_equipotrabajo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_plan" int4,
  "usuario" int4,
  "esresponsable" int2
)
;
ALTER TABLE "auditoria_programa_plan_equipotrabajo" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "entidad" int4,
  "code" int4,
  "orden" int4
)
;
ALTER TABLE "auditoria_programa_plan_estatus" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_estatus_permitido" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1
),
  "estatus_permitido" int4,
  "plan_status" int4
)
;
ALTER TABLE "auditoria_programa_plan_estatus_permitido" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_estatus_rol" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1
),
  "rol" int4,
  "plan_status" int4
)
;
ALTER TABLE "auditoria_programa_plan_estatus_rol" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_function_permitido" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1
),
  "estatus_permitido" int4,
  "plan_status" int4
)
;
ALTER TABLE "auditoria_programa_plan_function_permitido" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_function_rol" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1
),
  "rol" int4,
  "plan_status" int4
)
;
ALTER TABLE "auditoria_programa_plan_function_rol" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_participantes" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_plan" int4,
  "usuario" int4
)
;
ALTER TABLE "auditoria_programa_plan_participantes" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_prioridad" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4
)
;
ALTER TABLE "auditoria_programa_plan_prioridad" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_programa_plan_proceso" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_plan" int4,
  "proceso" int4,
  "revisado" int2
)
;
ALTER TABLE "auditoria_programa_plan_proceso" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_solicitud" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "estatus" int4
)
;
ALTER TABLE "auditoria_solicitud" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_solicitud_proceso" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "auditoria_solicitud" int4,
  "proceso" int4
)
;
ALTER TABLE "auditoria_solicitud_proceso" OWNER TO "user_sysplans";
CREATE TABLE "auditoria_solicitud_status" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "auditoria_solicitud_status" OWNER TO "user_sysplans";
CREATE TABLE "builder" (
  "nombre" varchar(500) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "builder" OWNER TO "user_sysplans";
CREATE TABLE "caracteristica" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "code" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "caracteristica" OWNER TO "user_sysplans";
CREATE TABLE "caracteristica_indicador" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "active" int2,
  "institucion" int4
)
;
ALTER TABLE "caracteristica_indicador" OWNER TO "user_sysplans";
CREATE TABLE "caracteristica_indicador_actividad" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "indicador_actividad" int4,
  "caracteristica" int4
)
;
ALTER TABLE "caracteristica_indicador_actividad" OWNER TO "user_sysplans";
CREATE TABLE "caracteristica_indicador_generico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "indicador_generico" int4,
  "caracteristica" int4
)
;
ALTER TABLE "caracteristica_indicador_generico" OWNER TO "user_sysplans";
CREATE TABLE "caracteristica_indicador_pei" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "indicador_pei" int4,
  "caracteristica" int4
)
;
ALTER TABLE "caracteristica_indicador_pei" OWNER TO "user_sysplans";
CREATE TABLE "caracteristica_indicador_poa" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "indicador_poa" int4,
  "caracteristica" int4
)
;
ALTER TABLE "caracteristica_indicador_poa" OWNER TO "user_sysplans";
CREATE TABLE "caracteristica_indicador_proceso" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "indicador_proceso" int4,
  "caracteristica" int4
)
;
ALTER TABLE "caracteristica_indicador_proceso" OWNER TO "user_sysplans";
CREATE TABLE "caracteristica_indicador_producto" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "indicador_producto" int4,
  "caracteristica" int4
)
;
ALTER TABLE "caracteristica_indicador_producto" OWNER TO "user_sysplans";
CREATE TABLE "cargo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "compania" int4,
  "institucion" int4,
  "active" int2
)
;
ALTER TABLE "cargo" OWNER TO "user_sysplans";
CREATE TABLE "catalogo_bienes_servicios" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nivel" varchar(1000) COLLATE "pg_catalog"."default",
  "segmento" varchar(1000) COLLATE "pg_catalog"."default",
  "familia" varchar(1000) COLLATE "pg_catalog"."default",
  "clase" varchar(1000) COLLATE "pg_catalog"."default",
  "material" varchar(1000) COLLATE "pg_catalog"."default",
  "desc_es" text COLLATE "pg_catalog"."default",
  "desc_en" text COLLATE "pg_catalog"."default",
  "codigo_clasificador_obj1" varchar(1000) COLLATE "pg_catalog"."default",
  "codigo_clasificador_obj2" varchar(1000) COLLATE "pg_catalog"."default",
  "desc_clasificador_obj1" varchar(1000) COLLATE "pg_catalog"."default",
  "desc_clasificador_obj2" varchar(1000) COLLATE "pg_catalog"."default",
  "definicion" text COLLATE "pg_catalog"."default",
  "sinonimos" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "catalogo_bienes_servicios" OWNER TO "user_sysplans";
CREATE TABLE "catalogo_bienes_servicios_auxiliar" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "materialid" varchar(100) COLLATE "pg_catalog"."default",
  "cuenta_auxiliar" varchar(100) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "catalogo_bienes_servicios_auxiliar" OWNER TO "user_sysplans";
CREATE TABLE "categoria_alerta" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "categoria_alerta" OWNER TO "user_sysplans";
CREATE TABLE "centro_costo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "centro_costo" OWNER TO "user_sysplans";
CREATE TABLE "clasificadores" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre_clasificador" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "code" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "clasificadores" OWNER TO "user_sysplans";
CREATE TABLE "clasificadores_bk" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre_clasificador" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "code" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "clasificadores_bk" OWNER TO "user_sysplans";
CREATE TABLE "clientes_compromisos" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "cliente" int4,
  "compromiso" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "created_by" int4,
  "tempid" varchar(200) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "clientes_compromisos" OWNER TO "user_sysplans";
CREATE TABLE "clientes_institucion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "compromiso_institucional" varchar(800) COLLATE "pg_catalog"."default",
  "pei" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "clientes_institucion" OWNER TO "user_sysplans";
CREATE TABLE "code_generator" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nomenclatura" varchar(255) COLLATE "pg_catalog"."default",
  "modulo" varchar(255) COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "code_generator" OWNER TO "user_sysplans";
CREATE TABLE "comentarios" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "comentario" text COLLATE "pg_catalog"."default",
  "type" int4,
  "created_at" timestamp(6) DEFAULT now(),
  "created_by" int4,
  "value" int4,
  "value2" int4,
  "value3" int4
)
;
ALTER TABLE "comentarios" OWNER TO "user_sysplans";
CREATE TABLE "compania" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "responsable" int4,
  "tipo_institucion" int4,
  "descripcion" varchar(500) COLLATE "pg_catalog"."default",
  "telefono" varchar(15) COLLATE "pg_catalog"."default",
  "direccion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "sigla" varchar(255) COLLATE "pg_catalog"."default",
  "maneja_pacc" int2,
  "maneja_institucion" int2,
  "sector" int4,
  "plan" int4,
  "correo" varchar(1000) COLLATE "pg_catalog"."default",
  "confirm" varchar(5000) COLLATE "pg_catalog"."default",
  "moneda" int4,
  "maneja_ods" int2,
  "meneja_estatus_producto_por_actividades" int2
)
;
ALTER TABLE "compania" OWNER TO "user_sysplans";
CREATE TABLE "compromiso" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "tipo_compromiso" int4,
  "institucion" int4,
  "active" int2
)
;
ALTER TABLE "compromiso" OWNER TO "user_sysplans";
CREATE TABLE "configuracion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "compania" int4,
  "nombre_institucion" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "funcionario" varchar(255) COLLATE "pg_catalog"."default",
  "telefono_oficial" varchar(15) COLLATE "pg_catalog"."default",
  "responsable_plan" int4,
  "depende_institucion" varchar(255) COLLATE "pg_catalog"."default",
  "direccion" varchar(255) COLLATE "pg_catalog"."default",
  "sitioweb" varchar(255) COLLATE "pg_catalog"."default",
  "cargo" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "configuracion" OWNER TO "user_sysplans";
CREATE TABLE "copy_config" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "companiaDesde" int4,
  "companiaHasta" int4,
  "nombrenuevo" varchar(255) COLLATE "pg_catalog"."default",
  "siglasnuevas" varchar(255) COLLATE "pg_catalog"."default",
  "foda" int2,
  "pesta" int2,
  "normativas_institucionales" int2,
  "grupos_de_interes" int2,
  "ejes_estrategicos" int2,
  "estrategias" int2,
  "resultados" int2,
  "indicadores_pei" int2
)
;
ALTER TABLE "copy_config" OWNER TO "user_sysplans";
CREATE TABLE "cuenta" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "tipo_cuenta" int4
)
;
ALTER TABLE "cuenta" OWNER TO "user_sysplans";
CREATE TABLE "denominacion_pnpsp" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "pnpsp" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "no_secuencia" int4
)
;
ALTER TABLE "denominacion_pnpsp" OWNER TO "user_sysplans";
CREATE TABLE "departamento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(500) COLLATE "pg_catalog"."default",
  "descripcion" varchar(1000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "compania" int4,
  "institucion" int4,
  "active" int2,
  "direccion_area" int4
)
;
ALTER TABLE "departamento" OWNER TO "user_sysplans";
CREATE TABLE "direcciones_area" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "direccion_general" int4
)
;
ALTER TABLE "direcciones_area" OWNER TO "user_sysplans";
CREATE TABLE "direcciones_generales" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "viceministerio" int4,
  "direccion_area" int4
)
;
ALTER TABLE "direcciones_generales" OWNER TO "user_sysplans";
CREATE TABLE "documental" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "root" varchar(8000) COLLATE "pg_catalog"."default",
  "created" timestamp(6),
  "created_by" int4,
  "updated" timestamp(6),
  "updated_by" int4,
  "type" int4,
  "code" varchar(8000) COLLATE "pg_catalog"."default",
  "version" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "documental" OWNER TO "user_sysplans";
CREATE TABLE "documental_file" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "folder" int4,
  "created" timestamp(6),
  "created_by" int4,
  "updated" timestamp(6),
  "code" varchar(8000) COLLATE "pg_catalog"."default",
  "version" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "documental_file" OWNER TO "user_sysplans";
CREATE TABLE "documento_externo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "compania" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "institucion_duena" varchar(1000) COLLATE "pg_catalog"."default",
  "fecha_creacion" date
)
;
ALTER TABLE "documento_externo" OWNER TO "user_sysplans";
CREATE TABLE "documentos_asociados" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "codigo" varchar(1000) COLLATE "pg_catalog"."default",
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "proceso" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "observacion" varchar(8000) COLLATE "pg_catalog"."default",
  "creado_por" int4,
  "aprobado_por" int4,
  "creado_en" timestamp(6),
  "aprobado_en" timestamp(6),
  "tipo_documento" int4,
  "estatus" int4,
  "procesos_categoria" int4,
  "folder" varchar(8000) COLLATE "pg_catalog"."default",
  "active" int4,
  "solicitud_documento" int4,
  "alcance" text COLLATE "pg_catalog"."default",
  "objetivo" text COLLATE "pg_catalog"."default",
  "marco_legal" text COLLATE "pg_catalog"."default",
  "resultado_esperado" text COLLATE "pg_catalog"."default",
  "trabaja_marco_legal" int2,
  "documento_general" int2,
  "version" int4 DEFAULT 1
)
;
ALTER TABLE "documentos_asociados" OWNER TO "user_sysplans";
CREATE TABLE "documentos_asociados_relacionado" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "documento_asociado" int4,
  "documento_asociado_relacionado" int4
)
;
ALTER TABLE "documentos_asociados_relacionado" OWNER TO "user_sysplans";
CREATE TABLE "documentos_asociados_status" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "maneja_repositorio" int2
)
;
ALTER TABLE "documentos_asociados_status" OWNER TO "user_sysplans";
CREATE TABLE "eje_estrategico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "no_orden" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "aliniacion_end" int4,
  "aliniacion_pnpsp" int4,
  "aliniacion_ods" int4,
  "pei" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "eje_estrategico" OWNER TO "user_sysplans";
CREATE TABLE "eje_estrategico_end" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "eje_estrategico" int4 NOT NULL,
  "end" int4 NOT NULL
)
;
ALTER TABLE "eje_estrategico_end" OWNER TO "user_sysplans";
CREATE TABLE "eje_estrategico_ods" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "eje_estrategico" int4 NOT NULL,
  "ods" int4 NOT NULL
)
;
ALTER TABLE "eje_estrategico_ods" OWNER TO "user_sysplans";
CREATE TABLE "eje_estrategico_pnpsp" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "eje_estrategico" int4 NOT NULL,
  "pnpsp" int4 NOT NULL
)
;
ALTER TABLE "eje_estrategico_pnpsp" OWNER TO "user_sysplans";
CREATE TABLE "end" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "descripcion" varchar(1000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "compania" int4,
  "edt" int4,
  "institucion" int4
)
;
ALTER TABLE "end" OWNER TO "user_sysplans";
CREATE TABLE "entity" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(1000) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "entity" OWNER TO "user_sysplans";
CREATE TABLE "estrategia" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "eje_estrategico" int4,
  "objetivo_estrategico" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "estrategia" OWNER TO "user_sysplans";
CREATE TABLE "estrategia_foda" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "foda" int4,
  "estrategia" int4,
  "tempid" varchar(500) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "estrategia_foda" OWNER TO "user_sysplans";
CREATE TABLE "estrategia_objetivo_especifico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "estrategia" int4,
  "objetivo_especifico" int4
)
;
ALTER TABLE "estrategia_objetivo_especifico" OWNER TO "user_sysplans";
CREATE TABLE "estrategia_pesta" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "pesta" int4,
  "estrategia" int4,
  "tempid" varchar(500) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "estrategia_pesta" OWNER TO "user_sysplans";
CREATE TABLE "estrategia_tratamiento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "entidad" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "estrategia_tratamiento" OWNER TO "user_sysplans";
CREATE TABLE "estructura_programatica" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "estructura_programatica" OWNER TO "user_sysplans";
CREATE TABLE "evaluacion_pei" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "poa" int4,
  "status" int4,
  "created" timestamp(6)
)
;
ALTER TABLE "evaluacion_pei" OWNER TO "user_sysplans";
CREATE TABLE "evaluacion_poa" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "poa" int4,
  "departamento" int4,
  "status" int4,
  "created" timestamp(6)
)
;
ALTER TABLE "evaluacion_poa" OWNER TO "user_sysplans";
CREATE TABLE "evento_indicador" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "urgencia" int4,
  "compania" int4,
  "institucion" int4,
  "tipo" int4
)
;
ALTER TABLE "evento_indicador" OWNER TO "user_sysplans";
CREATE TABLE "evento_indicador_relacion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "evento_indicador" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "urgencia" int4,
  "compania" int4,
  "institucion" int4,
  "tipo" int4
)
;
ALTER TABLE "evento_indicador_relacion" OWNER TO "user_sysplans";
CREATE TABLE "evento_indicador_urgencia" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "evento_indicador_urgencia" OWNER TO "user_sysplans";
CREATE TABLE "evento_riesgo_generico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "evento" int4,
  "compania" int4,
  "institucion" int4,
  "related" int2
)
;
ALTER TABLE "evento_riesgo_generico" OWNER TO "user_sysplans";
CREATE TABLE "evento_tipo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "evento_tipo" OWNER TO "user_sysplans";
CREATE TABLE "filemanager" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "entity" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "plural" varchar(255) COLLATE "pg_catalog"."default",
  "isfolder" int2,
  "where_filters" text COLLATE "pg_catalog"."default",
  "level" int4,
  "golevel" int4,
  "govar" varchar(255) COLLATE "pg_catalog"."default",
  "dtext" varchar(255) COLLATE "pg_catalog"."default",
  "dkey" varchar(255) COLLATE "pg_catalog"."default",
  "goleveltext" varchar(255) COLLATE "pg_catalog"."default",
  "isparent" int2,
  "folder" varchar(500) COLLATE "pg_catalog"."default",
  "cantidad" int4,
  "alternativeLevel" int4,
  "alternativeLevelText" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "filemanager" OWNER TO "user_sysplans";
CREATE TABLE "foda" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "fortalezas" text COLLATE "pg_catalog"."default",
  "debilidades" text COLLATE "pg_catalog"."default",
  "oportunidades" text COLLATE "pg_catalog"."default",
  "amenazas" text COLLATE "pg_catalog"."default",
  "pei" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "foda" OWNER TO "user_sysplans";
CREATE TABLE "foda_items" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "foda" int4,
  "type" int4,
  "description" text COLLATE "pg_catalog"."default",
  "num" int4,
  "numnuevo" int4,
  "numvejo" int4
)
;
ALTER TABLE "foda_items" OWNER TO "user_sysplans";
CREATE TABLE "foda_type" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "foda_type" OWNER TO "user_sysplans";
CREATE TABLE "fuente_financiamiento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(500) COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4
)
;
ALTER TABLE "fuente_financiamiento" OWNER TO "user_sysplans";
CREATE TABLE "gasby" (
  "conio" text COLLATE "pg_catalog"."default",
  "coni" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "gasby" OWNER TO "user_sysplans";
CREATE TABLE "hijo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "persona" int4,
  "edad" int4
)
;
ALTER TABLE "hijo" OWNER TO "user_sysplans";
CREATE TABLE "history" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "tipo" varchar(255) COLLATE "pg_catalog"."default",
  "idd" int4,
  "usuario" varchar(1000) COLLATE "pg_catalog"."default",
  "data" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "fecha" timestamp(6)
)
;
ALTER TABLE "history" OWNER TO "user_sysplans";
CREATE TABLE "iconos" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "nombre" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "iconos" OWNER TO "user_sysplans";
CREATE TABLE "impacto_politica" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "politica_gobierno" int4,
  "tempid" varchar(500) COLLATE "pg_catalog"."default",
  "no_secuencia" int4
)
;
ALTER TABLE "impacto_politica" OWNER TO "user_sysplans";
CREATE TABLE "import_actions" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "user_id" int4,
  "fecha" timestamp(6),
  "mensaje" text COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "import_actions" OWNER TO "user_sysplans";
CREATE TABLE "import_entity" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "table_name" varchar(255) COLLATE "pg_catalog"."default",
  "query" text COLLATE "pg_catalog"."default",
  "sheet" varchar(255) COLLATE "pg_catalog"."default",
  "required" int4
)
;
ALTER TABLE "import_entity" OWNER TO "user_sysplans";
CREATE TABLE "import_entity_fields" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "field_name" varchar(255) COLLATE "pg_catalog"."default",
  "required" int4,
  "validacion" text COLLATE "pg_catalog"."default",
  "fkof" varchar(255) COLLATE "pg_catalog"."default",
  "multipleof" varchar(255) COLLATE "pg_catalog"."default",
  "import_entity" int4,
  "query" text COLLATE "pg_catalog"."default",
  "field_excel" varchar(255) COLLATE "pg_catalog"."default",
  "iscompany" int4
)
;
ALTER TABLE "import_entity_fields" OWNER TO "user_sysplans";
CREATE TABLE "indicador_actividad" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "producto" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "fuente" varchar(255) COLLATE "pg_catalog"."default",
  "metodo_calculo" varchar(255) COLLATE "pg_catalog"."default",
  "tipo_meta" int4,
  "direccion_meta" int4,
  "linea_base" varchar(255) COLLATE "pg_catalog"."default",
  "medio_verificacion" varchar(1000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "periodo" int4,
  "indicador_poa" int4,
  "actividades_poa" int4,
  "ano_linea_base" int4,
  "caracteristica" int4,
  "desagregacion_demografica_geografia" text COLLATE "pg_catalog"."default",
  "observacion" text COLLATE "pg_catalog"."default",
  "condition" int4,
  "valor1" varchar(30) COLLATE "pg_catalog"."default",
  "valor2" varchar(30) COLLATE "pg_catalog"."default",
  "valor3" varchar(30) COLLATE "pg_catalog"."default",
  "valor4" varchar(30) COLLATE "pg_catalog"."default",
  "valor5" varchar(30) COLLATE "pg_catalog"."default",
  "valor6" varchar(30) COLLATE "pg_catalog"."default",
  "valor7" varchar(30) COLLATE "pg_catalog"."default",
  "valor8" varchar(30) COLLATE "pg_catalog"."default",
  "valor9" varchar(30) COLLATE "pg_catalog"."default",
  "valor10" varchar(30) COLLATE "pg_catalog"."default",
  "valor11" varchar(30) COLLATE "pg_catalog"."default",
  "valor12" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado1" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado2" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado3" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado4" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado5" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado6" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado7" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado8" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado9" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado10" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado11" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado12" varchar(30) COLLATE "pg_catalog"."default",
  "condition1" varchar(30) COLLATE "pg_catalog"."default",
  "condition2" varchar(30) COLLATE "pg_catalog"."default",
  "condition3" varchar(30) COLLATE "pg_catalog"."default",
  "condition4" varchar(30) COLLATE "pg_catalog"."default",
  "condition5" varchar(30) COLLATE "pg_catalog"."default",
  "condition6" varchar(30) COLLATE "pg_catalog"."default",
  "condition7" varchar(30) COLLATE "pg_catalog"."default",
  "condition8" varchar(30) COLLATE "pg_catalog"."default",
  "condition9" varchar(30) COLLATE "pg_catalog"."default",
  "condition10" varchar(30) COLLATE "pg_catalog"."default",
  "condition11" varchar(30) COLLATE "pg_catalog"."default",
  "condition12" varchar(30) COLLATE "pg_catalog"."default",
  "ws_connection_field" int4,
  "ws_connection" int4
)
;
ALTER TABLE "indicador_actividad" OWNER TO "user_sysplans";
CREATE TABLE "indicador_actividad_periodo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "periodo" int4,
  "valor" varchar(255) COLLATE "pg_catalog"."default",
  "indicador_actividad" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "valor_alcanzado" varchar(255) COLLATE "pg_catalog"."default",
  "comentario" varchar(4000) COLLATE "pg_catalog"."default",
  "condition" int4
)
;
ALTER TABLE "indicador_actividad_periodo" OWNER TO "user_sysplans";
CREATE TABLE "indicador_generico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "table_" int4,
  "registro" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "fuente" varchar(255) COLLATE "pg_catalog"."default",
  "metodo_calculo" varchar(255) COLLATE "pg_catalog"."default",
  "tipo_meta" int4,
  "direccion_meta" int4,
  "linea_base" varchar(255) COLLATE "pg_catalog"."default",
  "medio_verificacion" varchar(1000) COLLATE "pg_catalog"."default",
  "periodo" int4,
  "indicador_pei" int4,
  "ano_linea_base" int4,
  "caracteristica" int4,
  "desagregacion_demografica_geografia" text COLLATE "pg_catalog"."default",
  "observacion" text COLLATE "pg_catalog"."default",
  "condition" int4,
  "compania" int4,
  "institucion" int4,
  "poa" int4,
  "indicador_generico_entidad" varchar(2000) COLLATE "pg_catalog"."default",
  "valor1" varchar(30) COLLATE "pg_catalog"."default",
  "valor2" varchar(30) COLLATE "pg_catalog"."default",
  "valor3" varchar(30) COLLATE "pg_catalog"."default",
  "valor4" varchar(30) COLLATE "pg_catalog"."default",
  "valor5" varchar(30) COLLATE "pg_catalog"."default",
  "valor6" varchar(30) COLLATE "pg_catalog"."default",
  "valor7" varchar(30) COLLATE "pg_catalog"."default",
  "valor8" varchar(30) COLLATE "pg_catalog"."default",
  "valor9" varchar(30) COLLATE "pg_catalog"."default",
  "valor10" varchar(30) COLLATE "pg_catalog"."default",
  "valor11" varchar(30) COLLATE "pg_catalog"."default",
  "valor12" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado1" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado2" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado3" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado4" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado5" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado6" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado7" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado8" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado9" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado10" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado11" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado12" varchar(30) COLLATE "pg_catalog"."default",
  "condition1" varchar(30) COLLATE "pg_catalog"."default",
  "condition2" varchar(30) COLLATE "pg_catalog"."default",
  "condition3" varchar(30) COLLATE "pg_catalog"."default",
  "condition4" varchar(30) COLLATE "pg_catalog"."default",
  "condition5" varchar(30) COLLATE "pg_catalog"."default",
  "condition6" varchar(30) COLLATE "pg_catalog"."default",
  "condition7" varchar(30) COLLATE "pg_catalog"."default",
  "condition8" varchar(30) COLLATE "pg_catalog"."default",
  "condition9" varchar(30) COLLATE "pg_catalog"."default",
  "condition10" varchar(30) COLLATE "pg_catalog"."default",
  "condition11" varchar(30) COLLATE "pg_catalog"."default",
  "condition12" varchar(30) COLLATE "pg_catalog"."default",
  "poa_monitoreo" int4,
  "related" int2,
  "edt" varchar(255) COLLATE "pg_catalog"."default",
  "ano" int4,
  "departamento" int4
)
;
ALTER TABLE "indicador_generico" OWNER TO "user_sysplans";
CREATE TABLE "indicador_generico_entidad" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "table_" varchar(255) COLLATE "pg_catalog"."default",
  "where" text COLLATE "pg_catalog"."default",
  "label" varchar(255) COLLATE "pg_catalog"."default",
  "dashboard" varchar(1000) COLLATE "pg_catalog"."default",
  "variable" varchar(255) COLLATE "pg_catalog"."default",
  "orden" int2
)
;
ALTER TABLE "indicador_generico_entidad" OWNER TO "user_sysplans";
CREATE TABLE "indicador_generico_periodo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "periodo" int4,
  "valor" varchar(255) COLLATE "pg_catalog"."default",
  "indicador_generico" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "valor_alcanzado" varchar(255) COLLATE "pg_catalog"."default",
  "comentario" varchar(4000) COLLATE "pg_catalog"."default",
  "condition" int4
)
;
ALTER TABLE "indicador_generico_periodo" OWNER TO "user_sysplans";
CREATE TABLE "indicador_pacc" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "fuente" varchar(255) COLLATE "pg_catalog"."default",
  "metodo_calculo" varchar(255) COLLATE "pg_catalog"."default",
  "tipo_meta" int4,
  "direccion_meta" int4,
  "linea_base" varchar(255) COLLATE "pg_catalog"."default",
  "medio_verificacion" varchar(255) COLLATE "pg_catalog"."default",
  "pacc" int4
)
;
ALTER TABLE "indicador_pacc" OWNER TO "user_sysplans";
CREATE TABLE "indicador_pacc_periodo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "cuatrimestre" int4,
  "indicador" int4,
  "valor" int4,
  "valor_alcanzado" int4
)
;
ALTER TABLE "indicador_pacc_periodo" OWNER TO "user_sysplans";
CREATE TABLE "indicador_pei" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "eje_estrategico" int4,
  "objetivo_estrategico" int4,
  "estrategia" int4,
  "resultado" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "fuente" varchar(255) COLLATE "pg_catalog"."default",
  "metodo_calculo" varchar(255) COLLATE "pg_catalog"."default",
  "tipo_meta" int4,
  "direccion_meta" int4,
  "linea_base" varchar(255) COLLATE "pg_catalog"."default",
  "medio_verificacion" varchar(1000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "ano_linea_base" int4,
  "caracteristica" int4,
  "desagregacion_demografica_geografia" text COLLATE "pg_catalog"."default",
  "observacion" text COLLATE "pg_catalog"."default",
  "unidad_ejecutora" int4,
  "condition" int4,
  "valor1" varchar(30) COLLATE "pg_catalog"."default",
  "valor2" varchar(30) COLLATE "pg_catalog"."default",
  "valor3" varchar(30) COLLATE "pg_catalog"."default",
  "valor4" varchar(30) COLLATE "pg_catalog"."default",
  "valor5" varchar(30) COLLATE "pg_catalog"."default",
  "valor6" varchar(30) COLLATE "pg_catalog"."default",
  "valor7" varchar(30) COLLATE "pg_catalog"."default",
  "valor8" varchar(30) COLLATE "pg_catalog"."default",
  "valor9" varchar(30) COLLATE "pg_catalog"."default",
  "valor10" varchar(30) COLLATE "pg_catalog"."default",
  "valor11" varchar(30) COLLATE "pg_catalog"."default",
  "valor12" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado1" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado2" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado3" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado4" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado5" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado6" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado7" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado8" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado9" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado10" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado11" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado12" varchar(30) COLLATE "pg_catalog"."default",
  "condition1" varchar(30) COLLATE "pg_catalog"."default",
  "condition2" varchar(30) COLLATE "pg_catalog"."default",
  "condition3" varchar(30) COLLATE "pg_catalog"."default",
  "condition4" varchar(30) COLLATE "pg_catalog"."default",
  "condition5" varchar(30) COLLATE "pg_catalog"."default",
  "condition6" varchar(30) COLLATE "pg_catalog"."default",
  "condition7" varchar(30) COLLATE "pg_catalog"."default",
  "condition8" varchar(30) COLLATE "pg_catalog"."default",
  "condition9" varchar(30) COLLATE "pg_catalog"."default",
  "condition10" varchar(30) COLLATE "pg_catalog"."default",
  "condition11" varchar(30) COLLATE "pg_catalog"."default",
  "condition12" varchar(30) COLLATE "pg_catalog"."default",
  "ws_connection_field" int4,
  "ws_connection" int4,
  "compania" int4
)
;
ALTER TABLE "indicador_pei" OWNER TO "user_sysplans";
CREATE TABLE "indicador_pei_ano" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "ano" int4,
  "valor" varchar(255) COLLATE "pg_catalog"."default",
  "indicador_pei" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "valor_alcanzado" varchar(255) COLLATE "pg_catalog"."default",
  "comentario" text COLLATE "pg_catalog"."default",
  "condition" int4
)
;
ALTER TABLE "indicador_pei_ano" OWNER TO "user_sysplans";
CREATE TABLE "indicador_poa" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "producto" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "fuente" varchar(255) COLLATE "pg_catalog"."default",
  "metodo_calculo" varchar(255) COLLATE "pg_catalog"."default",
  "tipo_meta" int4,
  "direccion_meta" int4,
  "linea_base" varchar(255) COLLATE "pg_catalog"."default",
  "medio_verificacion" varchar(1000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "periodo" int4,
  "indicador_pei" int4,
  "ano_linea_base" int4,
  "caracteristica" int4,
  "desagregacion_demografica_geografia" text COLLATE "pg_catalog"."default",
  "observacion" text COLLATE "pg_catalog"."default",
  "condition" int4,
  "valor1" varchar(30) COLLATE "pg_catalog"."default",
  "valor2" varchar(30) COLLATE "pg_catalog"."default",
  "valor3" varchar(30) COLLATE "pg_catalog"."default",
  "valor4" varchar(30) COLLATE "pg_catalog"."default",
  "valor5" varchar(30) COLLATE "pg_catalog"."default",
  "valor6" varchar(30) COLLATE "pg_catalog"."default",
  "valor7" varchar(30) COLLATE "pg_catalog"."default",
  "valor8" varchar(30) COLLATE "pg_catalog"."default",
  "valor9" varchar(30) COLLATE "pg_catalog"."default",
  "valor10" varchar(30) COLLATE "pg_catalog"."default",
  "valor11" varchar(30) COLLATE "pg_catalog"."default",
  "valor12" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado1" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado2" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado3" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado4" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado5" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado6" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado7" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado8" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado9" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado10" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado11" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado12" varchar(30) COLLATE "pg_catalog"."default",
  "condition1" varchar(30) COLLATE "pg_catalog"."default",
  "condition2" varchar(30) COLLATE "pg_catalog"."default",
  "condition3" varchar(30) COLLATE "pg_catalog"."default",
  "condition4" varchar(30) COLLATE "pg_catalog"."default",
  "condition5" varchar(30) COLLATE "pg_catalog"."default",
  "condition6" varchar(30) COLLATE "pg_catalog"."default",
  "condition7" varchar(30) COLLATE "pg_catalog"."default",
  "condition8" varchar(30) COLLATE "pg_catalog"."default",
  "condition9" varchar(30) COLLATE "pg_catalog"."default",
  "condition10" varchar(30) COLLATE "pg_catalog"."default",
  "condition11" varchar(30) COLLATE "pg_catalog"."default",
  "condition12" varchar(30) COLLATE "pg_catalog"."default",
  "ws_connection_field" int4,
  "ws_connection" int4,
  "compania" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "indicador_poa" OWNER TO "user_sysplans";
CREATE TABLE "indicador_poa_periodo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "periodo" int4,
  "valor" varchar(255) COLLATE "pg_catalog"."default",
  "indicador_poa" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "valor_alcanzado" varchar(255) COLLATE "pg_catalog"."default",
  "comentario" varchar(4000) COLLATE "pg_catalog"."default",
  "condition" int4
)
;
ALTER TABLE "indicador_poa_periodo" OWNER TO "user_sysplans";
CREATE TABLE "indicador_proceso" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "producto" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "fuente" varchar(255) COLLATE "pg_catalog"."default",
  "metodo_calculo" varchar(255) COLLATE "pg_catalog"."default",
  "tipo_meta" int4,
  "direccion_meta" int4,
  "linea_base" varchar(255) COLLATE "pg_catalog"."default",
  "medio_verificacion" varchar(1000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "periodo" int4,
  "indicador_poa" int4,
  "actividades_poa" int4,
  "ano_linea_base" int4,
  "caracteristica" int4,
  "desagregacion_demografica_geografia" text COLLATE "pg_catalog"."default",
  "observacion" text COLLATE "pg_catalog"."default",
  "condition" int4,
  "valor1" varchar(30) COLLATE "pg_catalog"."default",
  "valor2" varchar(30) COLLATE "pg_catalog"."default",
  "valor3" varchar(30) COLLATE "pg_catalog"."default",
  "valor4" varchar(30) COLLATE "pg_catalog"."default",
  "valor5" varchar(30) COLLATE "pg_catalog"."default",
  "valor6" varchar(30) COLLATE "pg_catalog"."default",
  "valor7" varchar(30) COLLATE "pg_catalog"."default",
  "valor8" varchar(30) COLLATE "pg_catalog"."default",
  "valor9" varchar(30) COLLATE "pg_catalog"."default",
  "valor10" varchar(30) COLLATE "pg_catalog"."default",
  "valor11" varchar(30) COLLATE "pg_catalog"."default",
  "valor12" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado1" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado2" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado3" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado4" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado5" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado6" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado7" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado8" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado9" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado10" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado11" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado12" varchar(30) COLLATE "pg_catalog"."default",
  "condition1" varchar(30) COLLATE "pg_catalog"."default",
  "condition2" varchar(30) COLLATE "pg_catalog"."default",
  "condition3" varchar(30) COLLATE "pg_catalog"."default",
  "condition4" varchar(30) COLLATE "pg_catalog"."default",
  "condition5" varchar(30) COLLATE "pg_catalog"."default",
  "condition6" varchar(30) COLLATE "pg_catalog"."default",
  "condition7" varchar(30) COLLATE "pg_catalog"."default",
  "condition8" varchar(30) COLLATE "pg_catalog"."default",
  "condition9" varchar(30) COLLATE "pg_catalog"."default",
  "condition10" varchar(30) COLLATE "pg_catalog"."default",
  "condition11" varchar(30) COLLATE "pg_catalog"."default",
  "condition12" varchar(30) COLLATE "pg_catalog"."default",
  "ws_connection_field" int4,
  "ws_connection" int4,
  "poa_monitoreo" int4
)
;
ALTER TABLE "indicador_proceso" OWNER TO "user_sysplans";
CREATE TABLE "indicador_proceso_periodo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "periodo" int4,
  "valor" varchar(255) COLLATE "pg_catalog"."default",
  "indicador_proceso" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "valor_alcanzado" varchar(255) COLLATE "pg_catalog"."default",
  "comentario" varchar(4000) COLLATE "pg_catalog"."default",
  "condition" int4
)
;
ALTER TABLE "indicador_proceso_periodo" OWNER TO "user_sysplans";
CREATE TABLE "indicador_producto" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "producto" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "fuente" varchar(255) COLLATE "pg_catalog"."default",
  "metodo_calculo" varchar(255) COLLATE "pg_catalog"."default",
  "tipo_meta" int4,
  "direccion_meta" int4,
  "linea_base" varchar(255) COLLATE "pg_catalog"."default",
  "medio_verificacion" varchar(1000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "periodo" int4,
  "indicador_poa" int4,
  "actividades_poa" int4,
  "ano_linea_base" int4,
  "caracteristica" int4,
  "desagregacion_demografica_geografia" text COLLATE "pg_catalog"."default",
  "observacion" text COLLATE "pg_catalog"."default",
  "condition" int4,
  "valor1" varchar(30) COLLATE "pg_catalog"."default",
  "valor2" varchar(30) COLLATE "pg_catalog"."default",
  "valor3" varchar(30) COLLATE "pg_catalog"."default",
  "valor4" varchar(30) COLLATE "pg_catalog"."default",
  "valor5" varchar(30) COLLATE "pg_catalog"."default",
  "valor6" varchar(30) COLLATE "pg_catalog"."default",
  "valor7" varchar(30) COLLATE "pg_catalog"."default",
  "valor8" varchar(30) COLLATE "pg_catalog"."default",
  "valor9" varchar(30) COLLATE "pg_catalog"."default",
  "valor10" varchar(30) COLLATE "pg_catalog"."default",
  "valor11" varchar(30) COLLATE "pg_catalog"."default",
  "valor12" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado1" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado2" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado3" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado4" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado5" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado6" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado7" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado8" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado9" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado10" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado11" varchar(30) COLLATE "pg_catalog"."default",
  "valor_alcanzado12" varchar(30) COLLATE "pg_catalog"."default",
  "condition1" varchar(30) COLLATE "pg_catalog"."default",
  "condition2" varchar(30) COLLATE "pg_catalog"."default",
  "condition3" varchar(30) COLLATE "pg_catalog"."default",
  "condition4" varchar(30) COLLATE "pg_catalog"."default",
  "condition5" varchar(30) COLLATE "pg_catalog"."default",
  "condition6" varchar(30) COLLATE "pg_catalog"."default",
  "condition7" varchar(30) COLLATE "pg_catalog"."default",
  "condition8" varchar(30) COLLATE "pg_catalog"."default",
  "condition9" varchar(30) COLLATE "pg_catalog"."default",
  "condition10" varchar(30) COLLATE "pg_catalog"."default",
  "condition11" varchar(30) COLLATE "pg_catalog"."default",
  "condition12" varchar(30) COLLATE "pg_catalog"."default",
  "ws_connection_field" int4,
  "ws_connection" int4,
  "poa_monitoreo" int4,
  "indicador_ods" int4
)
;
ALTER TABLE "indicador_producto" OWNER TO "user_sysplans";
CREATE TABLE "indicador_producto_periodo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "periodo" int4,
  "valor" varchar(255) COLLATE "pg_catalog"."default",
  "indicador_proceso" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "valor_alcanzado" varchar(255) COLLATE "pg_catalog"."default",
  "comentario" varchar(4000) COLLATE "pg_catalog"."default",
  "condition" int4
)
;
ALTER TABLE "indicador_producto_periodo" OWNER TO "user_sysplans";
CREATE TABLE "indicador_producto_poa" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(256) COLLATE "pg_catalog"."default",
  "deleted_at" timestamp(6),
  "created_at" timestamp(6),
  "updated_at" timestamp(6)
)
;
ALTER TABLE "indicador_producto_poa" OWNER TO "user_sysplans";
CREATE TABLE "indicador_resultado_pei" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(256) COLLATE "pg_catalog"."default",
  "deleted_at" timestamp(6),
  "created_at" timestamp(6),
  "updated_at" timestamp(6)
)
;
ALTER TABLE "indicador_resultado_pei" OWNER TO "user_sysplans";
CREATE TABLE "institucion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "responsable" int4,
  "tipo_institucion" int4,
  "descripcion" varchar(500) COLLATE "pg_catalog"."default",
  "telefono" varchar(15) COLLATE "pg_catalog"."default",
  "direccion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "sigla" varchar(255) COLLATE "pg_catalog"."default",
  "maneja_pacc" int2,
  "maneja_institucion" int2,
  "sector" int4,
  "compania" int4
)
;
ALTER TABLE "institucion" OWNER TO "user_sysplans";
CREATE TABLE "involucrados" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre_completo" varchar(500) COLLATE "pg_catalog"."default",
  "correo" varchar(255) COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "active" int2,
  "tipo" int4
)
;
ALTER TABLE "involucrados" OWNER TO "user_sysplans";
CREATE TABLE "involucrados_tipo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "involucrados_tipo" OWNER TO "user_sysplans";
CREATE TABLE "linea_accion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "descripcion" varchar(1000) COLLATE "pg_catalog"."default",
  "objetivo" int4,
  "objetivo_especifico" int4,
  "tempid" varchar(200) COLLATE "pg_catalog"."default",
  "edt" int4,
  "end" int4
)
;
ALTER TABLE "linea_accion" OWNER TO "user_sysplans";
CREATE TABLE "linea_accion_politica" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "linea_accion" int4,
  "politica_gobierno" int4
)
;
ALTER TABLE "linea_accion_politica" OWNER TO "user_sysplans";
CREATE TABLE "login_history" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "usuario" int4,
  "date" timestamp(6),
  "compania" int4,
  "institucion" int4,
  "ip" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "login_history" OWNER TO "user_sysplans";
CREATE TABLE "mapa_proceso" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "fecha_inicio" date,
  "fecha_fin" date,
  "estatus" int4,
  "compania" int4,
  "institucion" int4
)
;
ALTER TABLE "mapa_proceso" OWNER TO "user_sysplans";
CREATE TABLE "marco_estrategico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "mision" text COLLATE "pg_catalog"."default",
  "vision" text COLLATE "pg_catalog"."default",
  "pei" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "historia" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "marco_estrategico" OWNER TO "user_sysplans";
CREATE TABLE "marco_estrategico_valores" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(1000) COLLATE "pg_catalog"."default",
  "marco_estrategico" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "conductas" varchar(1000) COLLATE "pg_catalog"."default",
  "tempid" varchar(200) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "marco_estrategico_valores" OWNER TO "user_sysplans";
CREATE TABLE "marco_estrategicos_virtudes" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(300) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "marco_estrategico_valor" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "tempid" varchar(200) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "marco_estrategicos_virtudes" OWNER TO "user_sysplans";
CREATE TABLE "marco_legal" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "marco_estrategico" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "marco_legal" OWNER TO "user_sysplans";
CREATE TABLE "mepydfiles" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "fecha" timestamp(6),
  "departamento" varchar(255) COLLATE "pg_catalog"."default",
  "poa" varchar(255) COLLATE "pg_catalog"."default",
  "estado" varchar(255) COLLATE "pg_catalog"."default",
  "correo" varchar(255) COLLATE "pg_catalog"."default",
  "compania" int4,
  "usuario" int4
)
;
ALTER TABLE "mepydfiles" OWNER TO "user_sysplans";
CREATE TABLE "mepydreports" (
  "compania" int8 NOT NULL,
  "compania_base" int4 NOT NULL,
  "entidad" varchar(255) COLLATE "pg_catalog"."default",
  "periodo_desde" int4,
  "periodo_hasta" int4,
  "eje" int4,
  "eje_estrategico" varchar(267) COLLATE "pg_catalog"."default",
  "objetivo" text COLLATE "pg_catalog"."default",
  "objetivo_estrategico" text COLLATE "pg_catalog"."default",
  "politica_id" int4,
  "politica" int4,
  "politica_gobierno" varchar(267) COLLATE "pg_catalog"."default",
  "impacto" varchar(23) COLLATE "pg_catalog"."default" NOT NULL,
  "impacto_politica" varchar(279) COLLATE "pg_catalog"."default" NOT NULL,
  "denominacion_pnpsp" varchar(279) COLLATE "pg_catalog"."default",
  "indicador_denominacion_pnpsp" varchar(255) COLLATE "pg_catalog"."default",
  "indicador_denominacion_pnpsp_base" int4,
  "indicador_denominacion_pnpsp_meta" varchar(255) COLLATE "pg_catalog"."default",
  "resultado" text COLLATE "pg_catalog"."default",
  "indicador_pei" text COLLATE "pg_catalog"."default",
  "indicador_pei_base" int4,
  "indicador_pei_meta" varchar(255) COLLATE "pg_catalog"."default",
  "indicador_pei_x" text COLLATE "pg_catalog"."default" NOT NULL,
  "end_edt" int4,
  "oge_edt" int4,
  "oes_edt" int4,
  "la_edt" int4,
  "objetivo_general_end" text COLLATE "pg_catalog"."default",
  "objetivo_especifico_end" text COLLATE "pg_catalog"."default",
  "linea_accion_end" text COLLATE "pg_catalog"."default",
  "mods" text COLLATE "pg_catalog"."default",
  "compromisos" text COLLATE "pg_catalog"."default",
  "no_producto" text COLLATE "pg_catalog"."default",
  "producto_id" int4,
  "producto" varchar(255) COLLATE "pg_catalog"."default",
  "producto_ano" int4,
  "indicador_poa" text COLLATE "pg_catalog"."default",
  "indicador_poa_fuente" text COLLATE "pg_catalog"."default",
  "medio_verificacion" text COLLATE "pg_catalog"."default",
  "indicador_departamentos" text COLLATE "pg_catalog"."default",
  "valor" text COLLATE "pg_catalog"."default",
  "departamento" varchar(255) COLLATE "pg_catalog"."default",
  "total" numeric(40,2) NOT NULL,
  "poa" int4 NOT NULL,
  "involucrados" text COLLATE "pg_catalog"."default",
  "supuestos" text COLLATE "pg_catalog"."default",
  "report" int4 NOT NULL
)
;
ALTER TABLE "mepydreports" OWNER TO "user_sysplans";
CREATE TABLE "mods" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "ods" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "edt" int4
)
;
ALTER TABLE "mods" OWNER TO "user_sysplans";
CREATE TABLE "moneda" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "codigo" varchar(255) COLLATE "pg_catalog"."default",
  "formato" varchar(255) COLLATE "pg_catalog"."default",
  "active" int2
)
;
ALTER TABLE "moneda" OWNER TO "user_sysplans";
CREATE TABLE "notificacion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "usuario" int4,
  "fecha_desde" timestamp(6),
  "fecha_hasta" timestamp(6),
  "rol" int4,
  "link" varchar(255) COLLATE "pg_catalog"."default",
  "estatus" int4,
  "active" int2,
  "institucion" int4
)
;
ALTER TABLE "notificacion" OWNER TO "user_sysplans";
CREATE TABLE "notificacion_rol" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "notificacion" int4,
  "rol" int4
)
;
ALTER TABLE "notificacion_rol" OWNER TO "user_sysplans";
CREATE TABLE "objetivo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "descripcion" varchar(1000) COLLATE "pg_catalog"."default",
  "end" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "tempid" varchar(200) COLLATE "pg_catalog"."default",
  "edt" int4
)
;
ALTER TABLE "objetivo" OWNER TO "user_sysplans";
CREATE TABLE "objetivo_end" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "id_objetivo" int4 NOT NULL,
  "id_end" int4 NOT NULL,
  "created_at" timestamp(6) NOT NULL,
  "created_by" int4 NOT NULL,
  "updated_at" timestamp(6),
  "updated_by" int4,
  "deleted_at" timestamp(6),
  "deleted_by" int4,
  "edt" int4
)
;
ALTER TABLE "objetivo_end" OWNER TO "user_sysplans";
CREATE TABLE "objetivo_especifico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "descripcion" varchar(1000) COLLATE "pg_catalog"."default",
  "objetivo" int4,
  "tempid" varchar(200) COLLATE "pg_catalog"."default",
  "edt" int4,
  "end" int4
)
;
ALTER TABLE "objetivo_especifico" OWNER TO "user_sysplans";
CREATE TABLE "objetivo_estrategico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "descripcion" varchar(1000) COLLATE "pg_catalog"."default",
  "eje_estrategico" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "edt" int4,
  "politica_gobierno" int4
)
;
ALTER TABLE "objetivo_estrategico" OWNER TO "user_sysplans";
CREATE TABLE "objetivo_estrategico_especifico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "objetivo_estrategico" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "objetivo_estrategico_especifico" OWNER TO "user_sysplans";
CREATE TABLE "objetivo_estrategico_oe_end" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "objetivo" varchar(255) COLLATE "pg_catalog"."default",
  "objetivo_estrategico" int4,
  "eje_estrategico_id" int4
)
;
ALTER TABLE "objetivo_estrategico_oe_end" OWNER TO "user_sysplans";
CREATE TABLE "objetivo_estrategico_politica_gobierno" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "objetivo_estrategico" int4,
  "politica_gobierno" int4
)
;
ALTER TABLE "objetivo_estrategico_politica_gobierno" OWNER TO "user_sysplans";
CREATE TABLE "objetivo_estrategico_productos_terminales" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "objetivo_estrategico" int4,
  "producto_terminal" int4
)
;
ALTER TABLE "objetivo_estrategico_productos_terminales" OWNER TO "user_sysplans";
CREATE TABLE "ods" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "descripcion" varchar(1000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "compania" int4,
  "edt" int4,
  "institucion" int4,
  "colorName" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "ods" OWNER TO "user_sysplans";
CREATE TABLE "ods_config" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "titulo" varchar(1000) COLLATE "pg_catalog"."default",
  "color" varchar(255) COLLATE "pg_catalog"."default",
  "from" int4,
  "to" int4,
  "orden" int4
)
;
ALTER TABLE "ods_config" OWNER TO "user_sysplans";
CREATE TABLE "organo_publico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "sector" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "organo_publico" OWNER TO "user_sysplans";
CREATE TABLE "otros_compromiso" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(500) COLLATE "pg_catalog"."default",
  "compromiso" int4,
  "description" text COLLATE "pg_catalog"."default",
  "tempid" varchar(200) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "otros_compromiso" OWNER TO "user_sysplans";
CREATE TABLE "pacc" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(500) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "capitulo" varchar(255) COLLATE "pg_catalog"."default",
  "subcapitulo" varchar(255) COLLATE "pg_catalog"."default",
  "unidad" varchar(255) COLLATE "pg_catalog"."default",
  "codigo" varchar(255) COLLATE "pg_catalog"."default",
  "año" int4,
  "fecha_revision" timestamp(6),
  "fecha_aprobacion" timestamp(6),
  "codigo_plan" varchar(255) COLLATE "pg_catalog"."default",
  "cantidad" int4,
  "version" varchar(10) COLLATE "pg_catalog"."default",
  "estatus" int4,
  "fecha_presentacion" timestamp(6),
  "active" int2,
  "compania" varchar(255) COLLATE "pg_catalog"."default",
  "condicion" int4,
  "lastprofile" int4,
  "institucion" int4,
  "unidad_compra" varchar(800) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "pacc" OWNER TO "user_sysplans";
CREATE TABLE "pacc_auditoria" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1
),
  "compania" int4,
  "institucion" int4,
  "campo" varchar(255) COLLATE "pg_catalog"."default",
  "valoranterior" varchar(1000) COLLATE "pg_catalog"."default",
  "valornuevo" varchar(1000) COLLATE "pg_catalog"."default",
  "cambiadoen" timestamp(6),
  "usuario" int4,
  "pacc_departamental_detail" int4
)
;
ALTER TABLE "pacc_auditoria" OWNER TO "user_sysplans";
CREATE TABLE "pacc_departamental" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "pacc" int4 NOT NULL,
  "departamento" int4 NOT NULL,
  "nombre" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "codigo" varchar(255) COLLATE "pg_catalog"."default",
  "cantidadtotal" int4,
  "version" varchar(10) COLLATE "pg_catalog"."default",
  "estatus" int4,
  "descripcion" varchar(1000) COLLATE "pg_catalog"."default",
  "fecha_modificacion" timestamp(6),
  "condicion" int4
)
;
ALTER TABLE "pacc_departamental" OWNER TO "user_sysplans";
CREATE TABLE "pacc_departamental_detail" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "pacc_departamento" int4 NOT NULL,
  "unidad" varchar(255) COLLATE "pg_catalog"."default",
  "periodo_1" numeric(18,2),
  "periodo_2" numeric(18,2),
  "periodo_3" numeric(18,2),
  "periodo_4" numeric(18,2),
  "estatus" int4,
  "cbs" varchar(255) COLLATE "pg_catalog"."default",
  "familia" int4,
  "precio_unitario" numeric(18,2),
  "costo_total" numeric(18,2),
  "costo_total_real" numeric(18,2),
  "procedimiento_seleccion" int4,
  "fuente_financiamiento" int4,
  "valor_adquirido" varchar(500) COLLATE "pg_catalog"."default",
  "observacion" varchar(500) COLLATE "pg_catalog"."default",
  "actividad" varchar(15) COLLATE "pg_catalog"."default",
  "actividad_apoyo" varchar(15) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "fecha_necesidad" timestamp(6),
  "cantidad_total" numeric(18,2),
  "periodo_5" numeric(18,2),
  "periodo_6" numeric(18,2),
  "periodo_7" numeric(18,2),
  "periodo_8" numeric(18,2),
  "periodo_9" numeric(18,2),
  "periodo_10" numeric(18,2),
  "periodo_11" numeric(18,2),
  "periodo_12" numeric(18,2),
  "periodo_1_real" numeric(18,2),
  "periodo_2_real" numeric(18,2),
  "periodo_3_real" numeric(18,2),
  "periodo_4_real" numeric(18,2),
  "deleted" int2,
  "costo_unitario_real" numeric(18,2),
  "periodo_1_cantidad" int4,
  "periodo_2_cantidad" int4,
  "periodo_3_cantidad" int4,
  "periodo_4_cantidad" int4
)
;
ALTER TABLE "pacc_departamental_detail" OWNER TO "user_sysplans";
CREATE TABLE "pacc_departamental_detail_version" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "pacc_departamento" int4 NOT NULL,
  "unidad" varchar(255) COLLATE "pg_catalog"."default",
  "cuatrimestre_1" numeric(18,2),
  "cuatrimestre_2" numeric(18,2),
  "cuatrimestre_3" numeric(18,2),
  "cuatrimestre_4" numeric(18,2),
  "estatus" int4,
  "cbs" varchar(255) COLLATE "pg_catalog"."default",
  "familia" int4,
  "precio_unitario" numeric(18,2),
  "costo_total" numeric(18,2),
  "procedimiento_seleccion" int4,
  "fuente_financiamiento" int4,
  "valor_adquirido" varchar(500) COLLATE "pg_catalog"."default",
  "observacion" varchar(500) COLLATE "pg_catalog"."default",
  "actividad" int4,
  "actividad_apoyo" int4,
  "documento_version" varchar(10) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "pacc_departamental_detail_version" OWNER TO "user_sysplans";
CREATE TABLE "pacc_departamental_version" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "pacc" int4 NOT NULL,
  "departamento" int4 NOT NULL,
  "nombre" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "codigo" varchar(255) COLLATE "pg_catalog"."default",
  "cantidadtotal" int4,
  "version" varchar(10) COLLATE "pg_catalog"."default",
  "estatus" int4,
  "documento_version" varchar(10) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "pacc_departamental_version" OWNER TO "user_sysplans";
CREATE TABLE "pacc_departamento_status" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "descripcion" varchar(500) COLLATE "pg_catalog"."default",
  "descripcion_larga" text COLLATE "pg_catalog"."default",
  "descripcion_before" varchar(500) COLLATE "pg_catalog"."default",
  "descripcion_larga_before" text COLLATE "pg_catalog"."default",
  "active" int2,
  "color" varchar(50) COLLATE "pg_catalog"."default",
  "color_next" varchar(50) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "pacc_departamento_status" OWNER TO "user_sysplans";
CREATE TABLE "pacc_departamento_status_before" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "pacc_departamento_status" int4,
  "pacc_departamento_status_before" int4
)
;
ALTER TABLE "pacc_departamento_status_before" OWNER TO "user_sysplans";
CREATE TABLE "pacc_departamento_status_next" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "pacc_departamento_status" int4,
  "pacc_departamento_status_next" int4
)
;
ALTER TABLE "pacc_departamento_status_next" OWNER TO "user_sysplans";
CREATE TABLE "pacc_status" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "next_descripcion" varchar(500) COLLATE "pg_catalog"."default",
  "next_descripcion_larga" text COLLATE "pg_catalog"."default",
  "before_descripcion" varchar(500) COLLATE "pg_catalog"."default",
  "before_descripcion_larga" text COLLATE "pg_catalog"."default",
  "active" int4,
  "color" varchar(50) COLLATE "pg_catalog"."default",
  "color_next" varchar(50) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "pacc_status" OWNER TO "user_sysplans";
CREATE TABLE "pacc_status_before" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "pacc_status" int4,
  "pacc_status_before" int4
)
;
ALTER TABLE "pacc_status_before" OWNER TO "user_sysplans";
CREATE TABLE "pacc_status_next" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "pacc_status" int4,
  "pacc_status_next" int4
)
;
ALTER TABLE "pacc_status_next" OWNER TO "user_sysplans";
CREATE TABLE "pacc_version" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(500) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "capitulo" varchar(255) COLLATE "pg_catalog"."default",
  "subcapitulo" varchar(255) COLLATE "pg_catalog"."default",
  "unidad" varchar(255) COLLATE "pg_catalog"."default",
  "codigo" varchar(255) COLLATE "pg_catalog"."default",
  "año" int4,
  "fecha_revision" timestamp(6),
  "fecha_aprobacion" timestamp(6),
  "codigo_plan" varchar(255) COLLATE "pg_catalog"."default",
  "cantidad" int4,
  "version" varchar(10) COLLATE "pg_catalog"."default",
  "estatus" int4,
  "documento_version" varchar(11) COLLATE "pg_catalog"."default",
  "active" int2
)
;
ALTER TABLE "pacc_version" OWNER TO "user_sysplans";
CREATE TABLE "pei" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "periodo_desde" int4,
  "periodo_hasta" int4,
  "estatus" int4,
  "compania" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "tempid" varchar(200) COLLATE "pg_catalog"."default",
  "autorizado" int4,
  "fecha_autorizacion" timestamp(6),
  "activo" int4,
  "institucion" int4
)
;
ALTER TABLE "pei" OWNER TO "user_sysplans";
CREATE TABLE "pei_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "order_at" int4
)
;
ALTER TABLE "pei_estatus" OWNER TO "user_sysplans";
CREATE TABLE "pei_poa" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "deleted_at" timestamp(6),
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "nombre" varchar(256) COLLATE "pg_catalog"."default" NOT NULL,
  "descripcion" varchar(256) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "pei_poa" OWNER TO "user_sysplans";
CREATE TABLE "periodo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "periodo" OWNER TO "user_sysplans";
CREATE TABLE "persona" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "edad" int4,
  "nacimiento_date" timestamp(6),
  "amas" int2
)
;
ALTER TABLE "persona" OWNER TO "user_sysplans";
CREATE TABLE "pesta" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "politicos" text COLLATE "pg_catalog"."default",
  "sociales" text COLLATE "pg_catalog"."default",
  "ambientales" text COLLATE "pg_catalog"."default",
  "economicos" text COLLATE "pg_catalog"."default",
  "tecnologicos" text COLLATE "pg_catalog"."default",
  "pei" int4 NOT NULL,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "pesta" OWNER TO "user_sysplans";
CREATE TABLE "pesta_items" (
  "pesta" int4,
  "pesta_type" int4,
  "description" text COLLATE "pg_catalog"."default",
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "num" int4,
  "numnuevo" int4,
  "numviejo" int4
)
;
ALTER TABLE "pesta_items" OWNER TO "user_sysplans";
CREATE TABLE "pesta_type" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "pesta_type" OWNER TO "user_sysplans";
CREATE TABLE "plan_base" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "features" text COLLATE "pg_catalog"."default",
  "pacc" int2,
  "riesgo" int2,
  "privada" int2,
  "multianual" int2,
  "cantidad_usuario_departamental" int4,
  "cantidad_usuario_planificacion" int4,
  "cantidad_admin" int4,
  "multiinstitucion" int2,
  "creacion_poa_flexibles" int2,
  "evidencias_flexibles" int2,
  "activo" int2,
  "precio" int4,
  "custom" int4,
  "nota" text COLLATE "pg_catalog"."default",
  "notadesc" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "plan_base" OWNER TO "user_sysplans";
CREATE TABLE "plan_modules" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "variable" varchar(255) COLLATE "pg_catalog"."default",
  "precio" numeric(18,2),
  "parent" varchar(1000) COLLATE "pg_catalog"."default",
  "required" varchar(1000) COLLATE "pg_catalog"."default",
  "negative" varchar(1000) COLLATE "pg_catalog"."default",
  "recibevalue" int2
)
;
ALTER TABLE "plan_modules" OWNER TO "user_sysplans";
CREATE TABLE "plan_modules_negative" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "parent" int4,
  "module" int4
)
;
ALTER TABLE "plan_modules_negative" OWNER TO "user_sysplans";
CREATE TABLE "plan_modules_required" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "parent" int4,
  "module" int4
)
;
ALTER TABLE "plan_modules_required" OWNER TO "user_sysplans";
CREATE TABLE "plan_precio" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "frecuencia" int4,
  "monto" numeric(18,2),
  "monto_inicial" numeric(18,2)
)
;
ALTER TABLE "plan_precio" OWNER TO "user_sysplans";
CREATE TABLE "plan_precio_descuento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(100) COLLATE "pg_catalog"."default",
  "plan" int4,
  "precio" int4,
  "cantidad" int4,
  "descuento_porcentaje" int4,
  "descuento_upgrade" int4
)
;
ALTER TABLE "plan_precio_descuento" OWNER TO "user_sysplans";
CREATE TABLE "plan_precio_frecuencia" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(100) COLLATE "pg_catalog"."default",
  "calculo" varchar(100) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "plan_precio_frecuencia" OWNER TO "user_sysplans";
CREATE TABLE "plan_transaccion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "features" text COLLATE "pg_catalog"."default",
  "pacc" int2,
  "riesgo" int2,
  "privada" int2,
  "multianual" int2,
  "cantidad_usuario_departamental" int4,
  "cantidad_usuario_planificacion" int4,
  "cantidad_admin" int4,
  "multiinstitucion" int2,
  "creacion_poa_flexibles" int2,
  "evidencias_flexibles" int2,
  "frecuencia" varchar(100) COLLATE "pg_catalog"."default",
  "monto" numeric(18,2),
  "monto_inicial" numeric(18,2),
  "descuento" int4,
  "compania" int4,
  "end_date" timestamp(6),
  "date" timestamp(6),
  "estatus" int4
)
;
ALTER TABLE "plan_transaccion" OWNER TO "user_sysplans";
CREATE TABLE "plan_transaccion_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(100) COLLATE "pg_catalog"."default",
  "descripcion" varchar(500) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "plan_transaccion_estatus" OWNER TO "user_sysplans";
CREATE TABLE "plataforma_financiera" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "actividades_poa" int4,
  "centro_costo" int4,
  "estructura_programatica" int4,
  "cuenta" int4,
  "actividades_apoyo" int4
)
;
ALTER TABLE "plataforma_financiera" OWNER TO "user_sysplans";
CREATE TABLE "pnpsp" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "compania" int4,
  "edt" int4,
  "institucion" int4
)
;
ALTER TABLE "pnpsp" OWNER TO "user_sysplans";
CREATE TABLE "poa" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "pei" int4,
  "periodo_poa" int4,
  "estado" int4,
  "monitoreo" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "presupuesto_institucional" numeric(18,2),
  "tempid" varchar(200) COLLATE "pg_catalog"."default",
  "autorizado" int4,
  "fecha_autorizacion" timestamp(6),
  "activo" int4,
  "compania" int4
)
;
ALTER TABLE "poa" OWNER TO "user_sysplans";
CREATE TABLE "poa_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "order_at" int4
)
;
ALTER TABLE "poa_estatus" OWNER TO "user_sysplans";
CREATE TABLE "poa_monitoreo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "nombre_mostrar" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "cantidad" int4
)
;
ALTER TABLE "poa_monitoreo" OWNER TO "user_sysplans";
CREATE TABLE "politica_denominacion_pnpsp" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "impacto_politica" int4,
  "denominacion_pnpsp" int4
)
;
ALTER TABLE "politica_denominacion_pnpsp" OWNER TO "user_sysplans";
CREATE TABLE "politica_gobierno" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "linea_base" varchar(255) COLLATE "pg_catalog"."default",
  "linea_base_ano" int4,
  "meta" varchar(255) COLLATE "pg_catalog"."default",
  "meta_ano" int4,
  "no_secuencia" int4
)
;
ALTER TABLE "politica_gobierno" OWNER TO "user_sysplans";
CREATE TABLE "presupuesto_aprobado" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "poa" int4,
  "departamento" int4,
  "valor" numeric(18,2),
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "tempid" varchar(200) COLLATE "pg_catalog"."default",
  "estatus" int4
)
;
ALTER TABLE "presupuesto_aprobado" OWNER TO "user_sysplans";
CREATE TABLE "presupuesto_aprobado_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "order_at" int4
)
;
ALTER TABLE "presupuesto_aprobado_estatus" OWNER TO "user_sysplans";
CREATE TABLE "procedimiento_seleccion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(500) COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4
)
;
ALTER TABLE "procedimiento_seleccion" OWNER TO "user_sysplans";
CREATE TABLE "procesos" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "procesos_categoria" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "objetivo" text COLLATE "pg_catalog"."default",
  "alcance" text COLLATE "pg_catalog"."default",
  "responsable" int4,
  "recursos" text COLLATE "pg_catalog"."default",
  "active" int2,
  "estatus" int4,
  "mapa_proceso" int4,
  "proceso_general" int2,
  "solicitud_proceso" int4
)
;
ALTER TABLE "procesos" OWNER TO "user_sysplans";
CREATE TABLE "procesos_categoria" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "mapa_proceso" int4
)
;
ALTER TABLE "procesos_categoria" OWNER TO "user_sysplans";
CREATE TABLE "procesos_elemento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "proceso" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "funcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "procesos_elemento" OWNER TO "user_sysplans";
CREATE TABLE "procesos_status" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "procesos_status" OWNER TO "user_sysplans";
CREATE TABLE "productos_poa" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "poa" int4,
  "resultado" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "departamento" int2,
  "fecha_inicio" date,
  "fecha_fin" date,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "estado" int4,
  "presupuesto_aprobado" int4,
  "descripcion" text COLLATE "pg_catalog"."default",
  "proyecto_item" int4
)
;
ALTER TABLE "productos_poa" OWNER TO "user_sysplans";
CREATE TABLE "productos_poa_status" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "order_at" int4
)
;
ALTER TABLE "productos_poa_status" OWNER TO "user_sysplans";
CREATE TABLE "proyecto_actividad" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "poa" int4,
  "proyecto" int4,
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "fecha_inicio" date,
  "fecha_fin" date,
  "responsable" int4,
  "presupuesto" numeric(18,2),
  "completa" int2,
  "comentario" text COLLATE "pg_catalog"."default",
  "razon" int4,
  "estatus" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "originalid" int4,
  "departamento" int4,
  "tipo_inversion" int4,
  "maneja_presupuesto" int2,
  "order_at" int4,
  "calificacion" varchar(255) COLLATE "pg_catalog"."default",
  "presupuesto_proyectado" int4,
  "cantidad_completa" int4
)
;
ALTER TABLE "proyecto_actividad" OWNER TO "user_sysplans";
CREATE TABLE "proyecto_actividad_apoyo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(1000) COLLATE "pg_catalog"."default",
  "descripcion" varchar(4000) COLLATE "pg_catalog"."default",
  "proyecto_actividad" int4,
  "estatus" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "departamento" int4,
  "fecha_inicio" date,
  "fecha_fin" date,
  "responsable" int4,
  "tempid" varchar(200) COLLATE "pg_catalog"."default",
  "departamento_solicitante" int4,
  "presupuesto" numeric(18,2),
  "razon" int4,
  "tipo_inversion" int4,
  "maneja_presupuesto" int2,
  "calificacion" varchar(255) COLLATE "pg_catalog"."default",
  "clasificador_id" int4,
  "maneja_presupuesto_act_apoyo" int4,
  "cantidad_completa" int4
)
;
ALTER TABLE "proyecto_actividad_apoyo" OWNER TO "user_sysplans";
CREATE TABLE "proyecto_actividad_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "proyecto_actividad_estatus" OWNER TO "user_sysplans";
CREATE TABLE "proyecto_actividad_mods" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "proyecto_actividad" int4,
  "mods" int4
)
;
ALTER TABLE "proyecto_actividad_mods" OWNER TO "user_sysplans";
CREATE TABLE "proyecto_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "proyecto_estatus" OWNER TO "user_sysplans";
CREATE TABLE "proyecto_item" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "departamento" int4,
  "responsable" int4,
  "estatus" int4,
  "from" timestamp(6),
  "to" timestamp(6),
  "resultado" int4,
  "monitoreo" int4,
  "heredado" int4,
  "presupuesto" numeric(18,2),
  "pei" int4
)
;
ALTER TABLE "proyecto_item" OWNER TO "user_sysplans";
CREATE TABLE "proyecto_item_actividad" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "proyecto_item" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "departamento" int4,
  "responsable" int4,
  "from" timestamp(6),
  "to" timestamp(6),
  "tempid" varchar(1000) COLLATE "pg_catalog"."default",
  "estatus" int4,
  "presupuesto" numeric(18,2),
  "razon" int4,
  "presupuesto_consumido" numeric(18,2),
  "avance_porcentaje" int4
)
;
ALTER TABLE "proyecto_item_actividad" OWNER TO "user_sysplans";
CREATE TABLE "proyecto_item_involucrado" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "proyecto_item" int4,
  "involucrado" int4
)
;
ALTER TABLE "proyecto_item_involucrado" OWNER TO "user_sysplans";
CREATE TABLE "proyecto_item_ods" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "proyecto_item" int4,
  "ods" int4
)
;
ALTER TABLE "proyecto_item_ods" OWNER TO "user_sysplans";
CREATE TABLE "prudcto_involucrado" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "producto" int4,
  "involucrado" int4
)
;
ALTER TABLE "prudcto_involucrado" OWNER TO "user_sysplans";
CREATE TABLE "razon" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre_razon" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "porcentaje" int4,
  "compania" int4,
  "tipo" int4,
  "active" int2,
  "institucion" int4
)
;
ALTER TABLE "razon" OWNER TO "user_sysplans";
CREATE TABLE "reporte_indicador_config" (
  "id" int4 NOT NULL,
  "tipo_meta" int4,
  "titulo" varchar(1000) COLLATE "pg_catalog"."default",
  "color" varchar(255) COLLATE "pg_catalog"."default",
  "from" int4,
  "to" int4,
  "orden" int4,
  "compania" int4
)
;
ALTER TABLE "reporte_indicador_config" OWNER TO "user_sysplans";
CREATE TABLE "reporte_tipometa_formula" (
  "id" int4 NOT NULL,
  "tipo_meta" int4,
  "direccion_meta" int4,
  "formula" varchar(1000) COLLATE "pg_catalog"."default",
  "formato" varchar(1000) COLLATE "pg_catalog"."default",
  "estilos" varchar(1000) COLLATE "pg_catalog"."default",
  "sumformula" varchar(1000) COLLATE "pg_catalog"."default",
  "sumformato" varchar(1000) COLLATE "pg_catalog"."default",
  "varianzaformula" varchar(1000) COLLATE "pg_catalog"."default",
  "varianzaformato" varchar(1000) COLLATE "pg_catalog"."default",
  "porcentaje" varchar(1000) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "reporte_tipometa_formula" OWNER TO "user_sysplans";
CREATE TABLE "responsable" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "tipo" int4,
  "active" int2
)
;
ALTER TABLE "responsable" OWNER TO "user_sysplans";
CREATE TABLE "responsable_tipo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "responsable_tipo" OWNER TO "user_sysplans";
CREATE TABLE "resultado" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "estrategia" int4,
  "perspectiva" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "tempid" varchar(200) COLLATE "pg_catalog"."default",
  "supuestos" text COLLATE "pg_catalog"."default",
  "tipo_resultado" int4
)
;
ALTER TABLE "resultado" OWNER TO "user_sysplans";
CREATE TABLE "resultado_compromiso" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "resultado" int4,
  "compromiso" int4
)
;
ALTER TABLE "resultado_compromiso" OWNER TO "user_sysplans";
CREATE TABLE "resultado_denominacion_pnpsp" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "resultado" int4,
  "denominacion_pnpsp" int4
)
;
ALTER TABLE "resultado_denominacion_pnpsp" OWNER TO "user_sysplans";
CREATE TABLE "resultado_linea_accion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "resultado" int4,
  "linea_accion" int4
)
;
ALTER TABLE "resultado_linea_accion" OWNER TO "user_sysplans";
CREATE TABLE "resultado_mods" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "resultado" int4,
  "mods" int4
)
;
ALTER TABLE "resultado_mods" OWNER TO "user_sysplans";
CREATE TABLE "resultado_otros_compromisos" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "resultado" int4,
  "otro_compromiso" int4
)
;
ALTER TABLE "resultado_otros_compromisos" OWNER TO "user_sysplans";
CREATE TABLE "resultado_supuesto" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "resultado" int4,
  "supuesto" int4
)
;
ALTER TABLE "resultado_supuesto" OWNER TO "user_sysplans";
CREATE TABLE "riesgo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "table_" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "probabilidad" int4,
  "impacto" int4,
  "factor_riesgo" int4,
  "consecuencia" varchar(4000) COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "registro" int4,
  "riesgo_entidad" varchar(1000) COLLATE "pg_catalog"."default",
  "riesgo_a" int4,
  "factor_riesgotext" varchar(1000) COLLATE "pg_catalog"."default",
  "causa_debilidad" varchar(1000) COLLATE "pg_catalog"."default",
  "estado" int4,
  "proceso" int4,
  "procesotext" varchar(1000) COLLATE "pg_catalog"."default",
  "estrategia" int4,
  "estado_plan_accion" int4,
  "observacion" text COLLATE "pg_catalog"."default",
  "ocurrencia" int2,
  "supuestos" text COLLATE "pg_catalog"."default",
  "mamfe_efecto" text COLLATE "pg_catalog"."default",
  "mamfe_causa" text COLLATE "pg_catalog"."default",
  "mamfe_deteccion" int4,
  "mamfe_gravedad" int4,
  "mamfe_ocurrencia" int4,
  "mamfe_deteccion_current" int4,
  "mamfe_gravedad_current" int4,
  "mamfe_ocurrencia_current" int4,
  "mamfe_elemento" int4,
  "mamfe" int4,
  "condicion" int2,
  "departamento" int4,
  "riesgo_historico" int4,
  "probabilidad_current" int4,
  "impacto_current" int4
)
;
ALTER TABLE "riesgo" OWNER TO "user_sysplans";
COMMENT ON COLUMN "riesgo"."nombre" IS 'modo de fallo';
COMMENT ON COLUMN "riesgo"."probabilidad" IS 'ocurrencia';
COMMENT ON COLUMN "riesgo"."impacto" IS 'gravedad';
CREATE TABLE "riesgo_a" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "table_" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "probabilidad" int4,
  "impacto" int4,
  "factor_riesgo" int4,
  "consecuencia" varchar(4000) COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "registro" int4,
  "riesgo_entidad" varchar(1000) COLLATE "pg_catalog"."default",
  "causa_debilidad" varchar(1000) COLLATE "pg_catalog"."default",
  "proceso" int4,
  "active" int2,
  "entidad" varchar(255) COLLATE "pg_catalog"."default",
  "supuestos" text COLLATE "pg_catalog"."default",
  "mamfe_efecto" text COLLATE "pg_catalog"."default",
  "mamfe_causa" text COLLATE "pg_catalog"."default",
  "mamfe_deteccion" int4,
  "mamfe_gravedad" int4,
  "mamfe_ocurrencia" int4,
  "mamfe_deteccion_current" int4,
  "mamfe_gravedad_current" int4,
  "mamfe_ocurrencia_current" int4,
  "mamfe_elemento" int4,
  "mamfe" int4
)
;
ALTER TABLE "riesgo_a" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_control" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "riesgo" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "efectividad" int4,
  "responsable" int4,
  "fecha_desde" timestamp(6),
  "fecha_hasta" timestamp(6),
  "recursos_financieros" numeric(18,2),
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "real" int4,
  "mamfe_correctiva" text COLLATE "pg_catalog"."default",
  "mamfe_fechacumplimiento" timestamp(6),
  "mamfe_accion_implantada" text COLLATE "pg_catalog"."default",
  "mamfe_estatus" int4,
  "mamfe" int4
)
;
ALTER TABLE "riesgo_control" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_entidad" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "table_" varchar(255) COLLATE "pg_catalog"."default",
  "where" text COLLATE "pg_catalog"."default",
  "label" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "riesgo_entidad" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4
)
;
ALTER TABLE "riesgo_estatus" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_historico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "estatus" int4,
  "compania" int4,
  "institucion" int4,
  "ano" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "riesgo_historico" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_impacto" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "valor" numeric(18,2),
  "compania" int4,
  "institucion" int4,
  "entidad" varchar(255) COLLATE "pg_catalog"."default",
  "valor_hasta" int4,
  "mamfe" int4
)
;
ALTER TABLE "riesgo_impacto" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_mamfe_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4
)
;
ALTER TABLE "riesgo_mamfe_estatus" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_matriz" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "probabilidad" int4,
  "impacto" int4,
  "resultado" int4
)
;
ALTER TABLE "riesgo_matriz" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_matriz_control" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "riesgo" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "efectividad" int4,
  "responsable" int4,
  "fecha_desde" timestamp(6),
  "fecha_hasta" timestamp(6),
  "recursos_financieros" numeric(18,2),
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "real" int4,
  "riesgo_control" int4,
  "mamfe_correctiva" text COLLATE "pg_catalog"."default",
  "mamfe_fechacumplimiento" timestamp(6),
  "mamfe_accion_implantada" text COLLATE "pg_catalog"."default",
  "mamfe_estatus" int4,
  "mamfe" int4
)
;
ALTER TABLE "riesgo_matriz_control" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_matriz_model" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "probabilidad" int4,
  "impacto" int4,
  "resultado" int4
)
;
ALTER TABLE "riesgo_matriz_model" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_probabilidad" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "valor" numeric(18,2),
  "compania" int4,
  "institucion" int4,
  "entidad" varchar(255) COLLATE "pg_catalog"."default",
  "valor_hasta" int4,
  "mamfe" int4
)
;
ALTER TABLE "riesgo_probabilidad" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_resultado" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "color" varchar(20) COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "valor" int4,
  "valor_to" int4,
  "entidad" varchar(255) COLLATE "pg_catalog"."default",
  "mamfe" int4
)
;
ALTER TABLE "riesgo_resultado" OWNER TO "user_sysplans";
CREATE TABLE "riesgo_resultado_amfe" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "color" varchar(20) COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "valor" int4,
  "valor_to" int4,
  "entidad" varchar(255) COLLATE "pg_catalog"."default",
  "mamfe" int4
)
;
ALTER TABLE "riesgo_resultado_amfe" OWNER TO "user_sysplans";
CREATE TABLE "sec_eje_sectorial" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "no_orden" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "sector" int4
)
;
ALTER TABLE "sec_eje_sectorial" OWNER TO "user_sysplans";
CREATE TABLE "sec_eje_sectorial_end_borrada" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "eje_sectorial" int4,
  "objetivo_general_end" int4
)
;
ALTER TABLE "sec_eje_sectorial_end_borrada" OWNER TO "user_sysplans";
CREATE TABLE "sec_objetivo_sectorial" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "eje_sectorial" int4,
  "no_orden" int4,
  "edt" int4
)
;
ALTER TABLE "sec_objetivo_sectorial" OWNER TO "user_sysplans";
CREATE TABLE "sec_objetivo_sectorial_eje_estrategico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "objetivo_sectorial" int4,
  "eje_estrategico" int4
)
;
ALTER TABLE "sec_objetivo_sectorial_eje_estrategico" OWNER TO "user_sysplans";
CREATE TABLE "sec_objetivo_sectorial_end_borrada" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "objetivo_sectorial" int4,
  "objetivo_especifico_end" int4
)
;
ALTER TABLE "sec_objetivo_sectorial_end_borrada" OWNER TO "user_sysplans";
CREATE TABLE "sec_productos_terminales_borrada" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "supuestos" text COLLATE "pg_catalog"."default",
  "involucrados" varchar(1000) COLLATE "pg_catalog"."default",
  "fecha_desde" timestamp(6),
  "fecha_hasta" timestamp(6),
  "active" int4,
  "programa_sectorial" int4,
  "no_orden" int4
)
;
ALTER TABLE "sec_productos_terminales_borrada" OWNER TO "user_sysplans";
CREATE TABLE "sec_productos_terminales_estatus_borrada" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "sec_productos_terminales_estatus_borrada" OWNER TO "user_sysplans";
CREATE TABLE "sec_productos_terminales_involucrados_borrada" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "producto_terminal" int4,
  "involucrado" int4
)
;
ALTER TABLE "sec_productos_terminales_involucrados_borrada" OWNER TO "user_sysplans";
CREATE TABLE "sec_productos_terminales_responsable_borrada" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "producto_terminal" int4,
  "institucion" int4
)
;
ALTER TABLE "sec_productos_terminales_responsable_borrada" OWNER TO "user_sysplans";
CREATE TABLE "sec_programa_sectorial" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "supuestos" text COLLATE "pg_catalog"."default",
  "involucrados" varchar(1000) COLLATE "pg_catalog"."default",
  "fecha_desde" timestamp(6),
  "fecha_hasta" timestamp(6),
  "active" int4,
  "resultado_sectorial" int4,
  "no_orden" int4,
  "poblacion_objetivo" varchar(500) COLLATE "pg_catalog"."default",
  "sector_economico_social" varchar(500) COLLATE "pg_catalog"."default",
  "estimacion_presupuestaria" numeric(18,2)
)
;
ALTER TABLE "sec_programa_sectorial" OWNER TO "user_sysplans";
CREATE TABLE "sec_programa_sectorial_eje_estrategico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_sectorial" int4,
  "eje_estrategico" int4
)
;
ALTER TABLE "sec_programa_sectorial_eje_estrategico" OWNER TO "user_sysplans";
CREATE TABLE "sec_programa_sectorial_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "sec_programa_sectorial_estatus" OWNER TO "user_sysplans";
CREATE TABLE "sec_programa_sectorial_finazas" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "ano" int4,
  "valor" numeric(18,2),
  "programa" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "sec_programa_sectorial_finazas" OWNER TO "user_sysplans";
CREATE TABLE "sec_programa_sectorial_involucrados" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_sectorial" int4,
  "involucrado" int4
)
;
ALTER TABLE "sec_programa_sectorial_involucrados" OWNER TO "user_sysplans";
CREATE TABLE "sec_programa_sectorial_objetivo_especifico" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_sectorial" int4,
  "objetivo_especifico" int4
)
;
ALTER TABLE "sec_programa_sectorial_objetivo_especifico" OWNER TO "user_sysplans";
CREATE TABLE "sec_programa_sectorial_responsable" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_sectorial" int4,
  "institucion" int4
)
;
ALTER TABLE "sec_programa_sectorial_responsable" OWNER TO "user_sysplans";
CREATE TABLE "sec_resultado_sectorial" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "supuestos" text COLLATE "pg_catalog"."default",
  "involucrados" varchar(1000) COLLATE "pg_catalog"."default",
  "fecha_desde" timestamp(6),
  "fecha_hasta" timestamp(6),
  "active" int4,
  "objetivo_sectorial" int4,
  "no_orden" int4,
  "poblacion_objetivo" varchar(500) COLLATE "pg_catalog"."default",
  "sector_economico_social" varchar(500) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "sec_resultado_sectorial" OWNER TO "user_sysplans";
CREATE TABLE "sec_resultado_sectorial_end_borrada" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "programa_sectorial" int4,
  "linea_accion" int4
)
;
ALTER TABLE "sec_resultado_sectorial_end_borrada" OWNER TO "user_sysplans";
CREATE TABLE "sec_resultado_sectorial_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "sec_resultado_sectorial_estatus" OWNER TO "user_sysplans";
CREATE TABLE "sec_resultado_sectorial_involucrados" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "resultado_sectorial" int4,
  "involucrado" int4
)
;
ALTER TABLE "sec_resultado_sectorial_involucrados" OWNER TO "user_sysplans";
CREATE TABLE "sec_resultado_sectorial_responsable" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "resultado_sectorial" int4,
  "institucion" int4
)
;
ALTER TABLE "sec_resultado_sectorial_responsable" OWNER TO "user_sysplans";
CREATE TABLE "sector" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "sector" OWNER TO "user_sysplans";
CREATE TABLE "ser_salida" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "compania" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "ser_salida_tipo" int4,
  "nivel_urgencia" int4,
  "nivel_impacto" int4,
  "ser_salida_estatus" int4,
  "nombre_queja" varchar(500) COLLATE "pg_catalog"."default",
  "telefono_queja" varchar(255) COLLATE "pg_catalog"."default",
  "correo_queja" varchar(255) COLLATE "pg_catalog"."default",
  "detalle_reporte" text COLLATE "pg_catalog"."default",
  "fecha_queja" date,
  "fecha_solucion" date,
  "comentario_cerrar" text COLLATE "pg_catalog"."default",
  "ser_servicio" int4,
  "esproceso" int4,
  "proceso" int4,
  "comentario" text COLLATE "pg_catalog"."default",
  "nivel_detectabilidad" int4
)
;
ALTER TABLE "ser_salida" OWNER TO "user_sysplans";
CREATE TABLE "ser_salida_comentario" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "comentario" varchar(255) COLLATE "pg_catalog"."default",
  "ser_salida" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "fecha" timestamp(6),
  "usuario" varchar(1000) COLLATE "pg_catalog"."default",
  "estatus" varchar(1000) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "ser_salida_comentario" OWNER TO "user_sysplans";
CREATE TABLE "ser_salida_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "ser_salida_estatus" OWNER TO "user_sysplans";
CREATE TABLE "ser_salida_tipo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "nececita_fecha_solucion" int2,
  "compania" int4
)
;
ALTER TABLE "ser_salida_tipo" OWNER TO "user_sysplans";
CREATE TABLE "ser_servicio" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "compania" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "ser_servicio_direccion" text COLLATE "pg_catalog"."default",
  "departamento" int4,
  "usuario" int4,
  "base_legal" text COLLATE "pg_catalog"."default",
  "requerimientos" text COLLATE "pg_catalog"."default",
  "pasos_solicitud" text COLLATE "pg_catalog"."default",
  "tiempo_respuesta" varchar(255) COLLATE "pg_catalog"."default",
  "tiempo_entrega" varchar(255) COLLATE "pg_catalog"."default",
  "formas_acceder" text COLLATE "pg_catalog"."default",
  "horario_prestacion" varchar(255) COLLATE "pg_catalog"."default",
  "costo" numeric(18,2),
  "informacion_adicional" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "ser_servicio" OWNER TO "user_sysplans";
CREATE TABLE "ser_tipo_servicio" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "ser_tipo_servicio" OWNER TO "user_sysplans";
CREATE TABLE "solicitud_documento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "proceso_categoria" int4,
  "proceso" int4,
  "tipo_documento" int4,
  "objetivo" text COLLATE "pg_catalog"."default",
  "alcance" text COLLATE "pg_catalog"."default",
  "marco_legal" text COLLATE "pg_catalog"."default",
  "solicitante" int4,
  "resultado_esperado" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "fecha_solicitud" timestamp(6) DEFAULT now(),
  "estatus" int4,
  "tipo_accion" int4,
  "nombre_documento" varchar(255) COLLATE "pg_catalog"."default",
  "codigo_documento" varchar(255) COLLATE "pg_catalog"."default",
  "documentos_asociados" int4,
  "trabaja_marco_legal" int2,
  "documento_creo" int4
)
;
ALTER TABLE "solicitud_documento" OWNER TO "user_sysplans";
CREATE TABLE "solicitud_documento_actividades" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "responsable" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default",
  "solicitud_documento" int4,
  "documento_asociado" int4
)
;
ALTER TABLE "solicitud_documento_actividades" OWNER TO "user_sysplans";
CREATE TABLE "solicitud_documento_area" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "solicitud_documento" int4,
  "departamento" int4
)
;
ALTER TABLE "solicitud_documento_area" OWNER TO "user_sysplans";
CREATE TABLE "solicitud_documento_tipo_accion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "solicitud_documento_tipo_accion" OWNER TO "user_sysplans";
CREATE TABLE "solicitud_proceso" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "proceso_categoria" int4,
  "objetivo" varchar(255) COLLATE "pg_catalog"."default",
  "alcance" varchar(255) COLLATE "pg_catalog"."default",
  "responsable" int4,
  "recursos" varchar(255) COLLATE "pg_catalog"."default",
  "estatus" int4,
  "mapa_proceso" int4,
  "nombre_proceso" varchar(255) COLLATE "pg_catalog"."default",
  "tipo_accion" int4,
  "fecha_solicitud" timestamp(0) DEFAULT now(),
  "compania" int4,
  "institucion" int4,
  "solicitante" int4,
  "proceso" int4,
  "descripcion_proceso" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "solicitud_proceso" OWNER TO "user_sysplans";
CREATE TABLE "supuestos" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre_completo" varchar(500) COLLATE "pg_catalog"."default",
  "correo" varchar(255) COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "active" int2,
  "tipo" int4
)
;
ALTER TABLE "supuestos" OWNER TO "user_sysplans";
CREATE TABLE "supuestos_tipo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "supuestos_tipo" OWNER TO "user_sysplans";
CREATE TABLE "temporalgasby" (
  "depa" text COLLATE "pg_catalog"."default",
  "producto" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "temporalgasby" OWNER TO "user_sysplans";
CREATE TABLE "ticket" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "menu" int4,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "type" int4,
  "usuario" int4,
  "compania" int4,
  "fecha" timestamp(6),
  "url" varchar(255) COLLATE "pg_catalog"."default",
  "institucion" int4,
  "responsable" int4,
  "ticket_referencia" int4
)
;
ALTER TABLE "ticket" OWNER TO "user_sysplans";
CREATE TABLE "ticket_estatus" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "ticket_estatus" OWNER TO "user_sysplans";
CREATE TABLE "ticket_respuesta" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "ticket" int4,
  "usuario" int4,
  "respuesta" text COLLATE "pg_catalog"."default",
  "estatus" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "ticket_respuesta" OWNER TO "user_sysplans";
CREATE TABLE "ticket_type" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "ticket_type" OWNER TO "user_sysplans";
CREATE TABLE "tipo_accion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "tipo_accion" OWNER TO "user_sysplans";
CREATE TABLE "tipo_auditores" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4
)
;
ALTER TABLE "tipo_auditores" OWNER TO "user_sysplans";
CREATE TABLE "tipo_auditorias" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "seguimiento" int2
)
;
ALTER TABLE "tipo_auditorias" OWNER TO "user_sysplans";
CREATE TABLE "tipo_comentario" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "tipo_comentario" OWNER TO "user_sysplans";
CREATE TABLE "tipo_compromiso" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "tipo_compromiso" OWNER TO "user_sysplans";
CREATE TABLE "tipo_cuenta" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "tipo_cuenta" OWNER TO "user_sysplans";
CREATE TABLE "tipo_documento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "trabaja_actividades" int2
)
;
ALTER TABLE "tipo_documento" OWNER TO "user_sysplans";
CREATE TABLE "tipo_inconformidad" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4
)
;
ALTER TABLE "tipo_inconformidad" OWNER TO "user_sysplans";
CREATE TABLE "tipo_institucion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4
)
;
ALTER TABLE "tipo_institucion" OWNER TO "user_sysplans";
CREATE TABLE "tipo_inversion" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "tipo_inversion" OWNER TO "user_sysplans";
CREATE TABLE "tipo_procedimiento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "descripcion" varchar(500) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "tipo_procedimiento" OWNER TO "user_sysplans";
CREATE TABLE "tipo_razon" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "tipo_razon" OWNER TO "user_sysplans";
CREATE TABLE "tipo_resultado" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "tipo_resultado" OWNER TO "user_sysplans";
CREATE TABLE "tipo_riesgo" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "institucion" int4,
  "active" int2
)
;
ALTER TABLE "tipo_riesgo" OWNER TO "user_sysplans";
CREATE TABLE "tipo_rol_auditores" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "lider" int2,
  "compania" int4,
  "institucion" int4
)
;
ALTER TABLE "tipo_rol_auditores" OWNER TO "user_sysplans";
CREATE TABLE "usuario" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "apellido" varchar(255) COLLATE "pg_catalog"."default",
  "cargo" int4,
  "correo" varchar(255) COLLATE "pg_catalog"."default",
  "compania" int4,
  "departamento" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "esadmin" int4,
  "user_id" int4,
  "password" varchar(250) COLLATE "pg_catalog"."default",
  "repeatPassword" varchar(250) COLLATE "pg_catalog"."default",
  "profile" int4,
  "active" int4,
  "institucion" int4,
  "interinstitucional" int2,
  "intersectorial" int2,
  "viceministerio" int4,
  "direccion_general" int4,
  "direccion_area" int4,
  "tipo_auditor" int4
)
;
ALTER TABLE "usuario" OWNER TO "user_sysplans";
CREATE TABLE "usuario_copy1" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "apellido" varchar(255) COLLATE "pg_catalog"."default",
  "cargo" int4,
  "correo" varchar(255) COLLATE "pg_catalog"."default",
  "compania" int4,
  "departamento" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6),
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "esadmin" int4,
  "user_id" int4,
  "password" varchar(250) COLLATE "pg_catalog"."default",
  "repeatPassword" varchar(250) COLLATE "pg_catalog"."default",
  "profile" int4,
  "active" int4
)
;
ALTER TABLE "usuario_copy1" OWNER TO "user_sysplans";
CREATE TABLE "usuario_departamento" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "usuario" int4,
  "departamento" int4,
  "tempid" varchar(500) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "usuario_departamento" OWNER TO "user_sysplans";
CREATE TABLE "value_value" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "valor" int4
)
;
ALTER TABLE "value_value" OWNER TO "user_sysplans";
CREATE TABLE "viceministerios" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "compania" int4,
  "tempid" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "viceministerios" OWNER TO "user_sysplans";
CREATE TABLE "viewcache" (
  "tabla" varchar(500) COLLATE "pg_catalog"."default",
  "views" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "viewcache" OWNER TO "user_sysplans";
CREATE TABLE "viewcache_history" (
  "viewname" varchar(1000) COLLATE "pg_catalog"."default",
  "rundate" timestamp(6)
)
;
ALTER TABLE "viewcache_history" OWNER TO "user_sysplans";
CREATE TABLE "vw_sectorial_tem" (
  "sector" int4,
  "entidad" varchar(255) COLLATE "pg_catalog"."default",
  "politica" int4,
  "politica_gobierno" varchar(255) COLLATE "pg_catalog"."default",
  "impacto" varchar(255) COLLATE "pg_catalog"."default",
  "impacto_politica" varchar(500) COLLATE "pg_catalog"."default",
  "denominacion_pnpsp" varchar(500) COLLATE "pg_catalog"."default",
  "indicador_denominacion_pnpsp" varchar(800) COLLATE "pg_catalog"."default",
  "indicador_denominacion_pnpsp_base" varchar(100) COLLATE "pg_catalog"."default",
  "indicador_denominacion_pnpsp_meta" varchar(255) COLLATE "pg_catalog"."default",
  "eje" int4
)
;
ALTER TABLE "vw_sectorial_tem" OWNER TO "user_sysplans";
CREATE TABLE "ws_connection" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "url" varchar(1000) COLLATE "pg_catalog"."default",
  "method" varchar(7) COLLATE "pg_catalog"."default",
  "headers" text COLLATE "pg_catalog"."default",
  "compania" int4
)
;
ALTER TABLE "ws_connection" OWNER TO "user_sysplans";
CREATE TABLE "ws_connection_field" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "ws_connection" int4,
  "resultPath" text COLLATE "pg_catalog"."default",
  "calcs" text COLLATE "pg_catalog"."default",
  "ws_periods" int4,
  "metodo" varchar(500) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "ws_connection_field" OWNER TO "user_sysplans";
CREATE TABLE "ws_periods" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "ws_periods" OWNER TO "user_sysplans";
ALTER TABLE "actividades_apoyo" ADD CONSTRAINT "actividades_apoyo_pkey" PRIMARY KEY ("id");
ALTER TABLE "actividades_apoyo_estatus" ADD CONSTRAINT "actividades_apoyo_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "actividades_poa" ADD CONSTRAINT "actividades_poa_pkey" PRIMARY KEY ("id");
ALTER TABLE "actividades_poa_estatus" ADD CONSTRAINT "actividades_poa_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "actividades_poa_involucrado" ADD CONSTRAINT "actividades_poa_involucrado_pkey" PRIMARY KEY ("id");
ALTER TABLE "asignacion_especial_poa" ADD CONSTRAINT "asignacion_especial_poa_pkey" PRIMARY KEY ("id");
ALTER TABLE "asignacion_especial_poa_estatus" ADD CONSTRAINT "asignacion_especial_poa_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_comentarios" ADD CONSTRAINT "auditoria_comentarios_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_entidad_flujo" ADD CONSTRAINT "auditoria_entidad_flujo_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_informe" ADD CONSTRAINT "auditoria_informe_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_lista_correctiva" ADD CONSTRAINT "auditoria_lista_correctiva_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_lista_correctiva_departamento" ADD CONSTRAINT "auditoria_lista_correctiva_departamento_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_lista_correctiva_responsable" ADD CONSTRAINT "auditoria_lista_correctiva_responsable_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_lista_preventiva" ADD CONSTRAINT "auditoria_lista_preventiva_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_lista_status" ADD CONSTRAINT "auditoria_lista_status_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa" ADD CONSTRAINT "auditoria_programa_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan" ADD CONSTRAINT "auditoria_programa_plan_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_action" ADD CONSTRAINT "auditoria_programa_plan_action_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_action_function" ADD CONSTRAINT "auditoria_programa_plan_action_function_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_action_permitido" ADD CONSTRAINT "auditoria_programa_plan_action_permitido_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_action_rol" ADD CONSTRAINT "auditoria_programa_plan_action_rol_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_departamento" ADD CONSTRAINT "auditoria_programa_plan_departamento_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_documentos_asociados" ADD CONSTRAINT "auditoria_programa_plan_documentos_asociados_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_documentos_asociados_listaverificacion" ADD CONSTRAINT "auditoria_programa_plan_documentos_asociados_listaverifica_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_documentos_asociados_responsables" ADD CONSTRAINT "auditoria_programa_plan_documentos_asociados_responsables_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_equipotrabajo" ADD CONSTRAINT "auditoria_programa_plan_equipotrabajo_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_estatus" ADD CONSTRAINT "auditoria_programa_plan_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_estatus_permitido" ADD CONSTRAINT "auditoria_programa_plan_estatus_permitido_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_estatus_rol" ADD CONSTRAINT "auditoria_programa_plan_estatus_rol_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_function_permitido" ADD CONSTRAINT "auditoria_programa_plan_function_permitido_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_function_rol" ADD CONSTRAINT "auditoria_programa_plan_function_rol_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_participantes" ADD CONSTRAINT "auditoria_programa_plan_participantes_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_prioridad" ADD CONSTRAINT "auditoria_programa_plan_prioridad_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_proceso" ADD CONSTRAINT "auditoria_programa_plan_proceso_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_solicitud" ADD CONSTRAINT "auditoria_solicitud_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_solicitud_proceso" ADD CONSTRAINT "auditoria_solicitud_proceso_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_solicitud_status" ADD CONSTRAINT "auditoria_solicitud_status_pkey" PRIMARY KEY ("id");
ALTER TABLE "caracteristica_indicador" ADD CONSTRAINT "caracteristica_indicador_pkey" PRIMARY KEY ("id");
ALTER TABLE "caracteristica_indicador_actividad" ADD CONSTRAINT "caracteristica_indicador_actividad_pkey" PRIMARY KEY ("id");
ALTER TABLE "caracteristica_indicador_pei" ADD CONSTRAINT "caracteristica_indicador_pei_pkey" PRIMARY KEY ("id");
ALTER TABLE "caracteristica_indicador_poa" ADD CONSTRAINT "caracteristica_indicador_poa_pkey" PRIMARY KEY ("id");
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_pkey" PRIMARY KEY ("id");
ALTER TABLE "catalogo_bienes_servicios" ADD CONSTRAINT "catalogo_bienes_servicios_pkey" PRIMARY KEY ("id");
ALTER TABLE "catalogo_bienes_servicios_auxiliar" ADD CONSTRAINT "catalogo_bienes_servicios_auxiliar_pkey" PRIMARY KEY ("id");
ALTER TABLE "categoria_alerta" ADD CONSTRAINT "categoria_alerta_pkey" PRIMARY KEY ("id");
ALTER TABLE "centro_costo" ADD CONSTRAINT "centro_costo_pkey" PRIMARY KEY ("id");
ALTER TABLE "clasificadores" ADD CONSTRAINT "clasificadores_pkey" PRIMARY KEY ("id");
ALTER TABLE "clasificadores_bk" ADD CONSTRAINT "clasificadores_bk_pkey" PRIMARY KEY ("id");
ALTER TABLE "clientes_compromisos" ADD CONSTRAINT "clientes_compromisos_pkey" PRIMARY KEY ("id");
ALTER TABLE "clientes_institucion" ADD CONSTRAINT "clientes_institucion_pkey" PRIMARY KEY ("id");
ALTER TABLE "code_generator" ADD CONSTRAINT "code_generator_pkey" PRIMARY KEY ("id");
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id");
CREATE INDEX "comentarios_type_idx" ON "comentarios" USING btree (
  "type" "pg_catalog"."int4_ops" ASC NULLS LAST
);
ALTER TABLE "compania" ADD CONSTRAINT "compania_pkey" PRIMARY KEY ("id");
ALTER TABLE "compromiso" ADD CONSTRAINT "compromiso_pkey" PRIMARY KEY ("id");
ALTER TABLE "configuracion" ADD CONSTRAINT "configuracion_pkey" PRIMARY KEY ("id");
ALTER TABLE "copy_config" ADD CONSTRAINT "copy_config_pkey" PRIMARY KEY ("id");
ALTER TABLE "cuenta" ADD CONSTRAINT "cuenta_pkey" PRIMARY KEY ("id");
ALTER TABLE "denominacion_pnpsp" ADD CONSTRAINT "denominacion_pnpsp_pkey" PRIMARY KEY ("id");
ALTER TABLE "departamento" ADD CONSTRAINT "departamento_pkey" PRIMARY KEY ("id");
ALTER TABLE "direcciones_area" ADD CONSTRAINT "direcciones_area_pkey" PRIMARY KEY ("id");
ALTER TABLE "direcciones_generales" ADD CONSTRAINT "direcciones_generales_pkey" PRIMARY KEY ("id");
ALTER TABLE "documental" ADD CONSTRAINT "documental_pkey" PRIMARY KEY ("id");
ALTER TABLE "documental_file" ADD CONSTRAINT "documental_file_pkey" PRIMARY KEY ("id");
ALTER TABLE "documento_externo" ADD CONSTRAINT "documento_externo_pkey" PRIMARY KEY ("id");
ALTER TABLE "documentos_asociados" ADD CONSTRAINT "documentos_asociados_pkey" PRIMARY KEY ("id");
ALTER TABLE "documentos_asociados_relacionado" ADD CONSTRAINT "documentos_asociados_relacionado_pkey" PRIMARY KEY ("id");
ALTER TABLE "documentos_asociados_status" ADD CONSTRAINT "documentos_asociados_status_pkey" PRIMARY KEY ("id");
ALTER TABLE "eje_estrategico" ADD CONSTRAINT "eje_estrategico_pkey" PRIMARY KEY ("id");
ALTER TABLE "eje_estrategico_end" ADD CONSTRAINT "eje_estrategico_end_pkey" PRIMARY KEY ("id");
ALTER TABLE "eje_estrategico_ods" ADD CONSTRAINT "eje_estrategico_ods_pkey" PRIMARY KEY ("id");
ALTER TABLE "eje_estrategico_pnpsp" ADD CONSTRAINT "eje_estrategico_pnpsp_pkey" PRIMARY KEY ("id");
ALTER TABLE "end" ADD CONSTRAINT "end_pkey" PRIMARY KEY ("id");
ALTER TABLE "entity" ADD CONSTRAINT "entity_pkey" PRIMARY KEY ("id");
ALTER TABLE "estrategia" ADD CONSTRAINT "estrategia_pkey" PRIMARY KEY ("id");
ALTER TABLE "estrategia_foda" ADD CONSTRAINT "estrategia_foda_pkey" PRIMARY KEY ("id");
ALTER TABLE "estrategia_objetivo_especifico" ADD CONSTRAINT "estrategia_objetivo_especifico_pkey" PRIMARY KEY ("id");
ALTER TABLE "estrategia_pesta" ADD CONSTRAINT "estrategia_pesta_pkey" PRIMARY KEY ("id");
ALTER TABLE "estrategia_tratamiento" ADD CONSTRAINT "estrategia_tratamiento_pkey" PRIMARY KEY ("id");
ALTER TABLE "estructura_programatica" ADD CONSTRAINT "estructura_programatica_pkey" PRIMARY KEY ("id");
ALTER TABLE "evaluacion_pei" ADD CONSTRAINT "evaluacion_pei_pkey" PRIMARY KEY ("id");
ALTER TABLE "evaluacion_poa" ADD CONSTRAINT "evaluacion_poa_pkey" PRIMARY KEY ("id");
ALTER TABLE "evento_indicador" ADD CONSTRAINT "evento_indicador_pkey" PRIMARY KEY ("id");
ALTER TABLE "evento_indicador_relacion" ADD CONSTRAINT "evento_indicador_relation_pkey" PRIMARY KEY ("id");
ALTER TABLE "evento_indicador_urgencia" ADD CONSTRAINT "evento_indicador_urgencia_pkey" PRIMARY KEY ("id");
ALTER TABLE "evento_riesgo_generico" ADD CONSTRAINT "evento_riesgo_generico_pkey" PRIMARY KEY ("id");
ALTER TABLE "evento_tipo" ADD CONSTRAINT "evento_tipo_pkey" PRIMARY KEY ("id");
ALTER TABLE "filemanager" ADD CONSTRAINT "filemanager_pkey" PRIMARY KEY ("id");
ALTER TABLE "foda" ADD CONSTRAINT "foda_pkey" PRIMARY KEY ("id");
ALTER TABLE "foda_items" ADD CONSTRAINT "foda_items_pkey" PRIMARY KEY ("id");
ALTER TABLE "foda_type" ADD CONSTRAINT "foda_type_pkey" PRIMARY KEY ("id");
ALTER TABLE "fuente_financiamiento" ADD CONSTRAINT "fuente_financiamiento_pkey" PRIMARY KEY ("id");
ALTER TABLE "hijo" ADD CONSTRAINT "hijo_pkey" PRIMARY KEY ("id");
ALTER TABLE "history" ADD CONSTRAINT "history_pkey" PRIMARY KEY ("id");
ALTER TABLE "impacto_politica" ADD CONSTRAINT "impacto_politica_pkey" PRIMARY KEY ("id");
ALTER TABLE "import_actions" ADD CONSTRAINT "import_actions_pkey" PRIMARY KEY ("id");
ALTER TABLE "import_entity" ADD CONSTRAINT "import_entity_pkey" PRIMARY KEY ("id");
ALTER TABLE "import_entity_fields" ADD CONSTRAINT "import_entity_fields_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_actividad" ADD CONSTRAINT "indicador_actividad_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_actividad_periodo" ADD CONSTRAINT "indicador_actividad_periodo_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_generico" ADD CONSTRAINT "indicador_generico_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_generico_entidad" ADD CONSTRAINT "indicador_generico_entidad_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_generico_periodo" ADD CONSTRAINT "indicador_generico_periodo_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_pacc" ADD CONSTRAINT "indicador_pacc_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_pacc_periodo" ADD CONSTRAINT "indicador_pacc_periodo_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_pei" ADD CONSTRAINT "indicador_pei_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_pei_ano" ADD CONSTRAINT "indicador_pei_ano_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_poa" ADD CONSTRAINT "indicador_poa_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_poa_periodo" ADD CONSTRAINT "indicador_poa_periodo_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_proceso" ADD CONSTRAINT "indicador_proceso_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_proceso_periodo" ADD CONSTRAINT "indicador_proceso_periodo_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_producto" ADD CONSTRAINT "indicador_producto_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_producto_periodo" ADD CONSTRAINT "indicador_producto_periodo_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_producto_poa" ADD CONSTRAINT "indicador_producto_poa_pkey" PRIMARY KEY ("id");
ALTER TABLE "indicador_resultado_pei" ADD CONSTRAINT "indicador_resultado_pei_pkey" PRIMARY KEY ("id");
ALTER TABLE "institucion" ADD CONSTRAINT "institucion_pkey" PRIMARY KEY ("id");
ALTER TABLE "involucrados" ADD CONSTRAINT "involucrados_pkey" PRIMARY KEY ("id");
ALTER TABLE "involucrados_tipo" ADD CONSTRAINT "involucrados_tipo_pkey" PRIMARY KEY ("id");
ALTER TABLE "linea_accion" ADD CONSTRAINT "linea_accion_pkey" PRIMARY KEY ("id");
ALTER TABLE "linea_accion_politica" ADD CONSTRAINT "linea_accion_politica_pkey" PRIMARY KEY ("id");
ALTER TABLE "login_history" ADD CONSTRAINT "login_history_pkey" PRIMARY KEY ("id");
ALTER TABLE "mapa_proceso" ADD CONSTRAINT "mapa_proceso_pkey" PRIMARY KEY ("id");
ALTER TABLE "marco_estrategico" ADD CONSTRAINT "marco_estrategico_pkey" PRIMARY KEY ("id");
ALTER TABLE "marco_estrategico_valores" ADD CONSTRAINT "marco_estrategico_valores_pkey" PRIMARY KEY ("id");
ALTER TABLE "marco_estrategicos_virtudes" ADD CONSTRAINT "marco_estrategicos_virtudes_pkey" PRIMARY KEY ("id");
ALTER TABLE "marco_legal" ADD CONSTRAINT "marco_legal_pkey" PRIMARY KEY ("id");
ALTER TABLE "mepydfiles" ADD CONSTRAINT "mepydfiles_pkey" PRIMARY KEY ("id");
ALTER TABLE "mods" ADD CONSTRAINT "mods_pkey" PRIMARY KEY ("id");
ALTER TABLE "moneda" ADD CONSTRAINT "moneda_pkey" PRIMARY KEY ("id");
ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_pkey" PRIMARY KEY ("id");
ALTER TABLE "notificacion_rol" ADD CONSTRAINT "notificacion_rol_pkey" PRIMARY KEY ("id");
ALTER TABLE "objetivo" ADD CONSTRAINT "objetivo_pkey" PRIMARY KEY ("id");
ALTER TABLE "objetivo_end" ADD CONSTRAINT "objetivo_end_pkey" PRIMARY KEY ("id");
ALTER TABLE "objetivo_especifico" ADD CONSTRAINT "objetivo_especifico_pkey" PRIMARY KEY ("id");
ALTER TABLE "objetivo_estrategico" ADD CONSTRAINT "objetivo_estrategico_pkey" PRIMARY KEY ("id");
ALTER TABLE "objetivo_estrategico_especifico" ADD CONSTRAINT "objetivo_estrategico_especifico_pkey" PRIMARY KEY ("id");
ALTER TABLE "objetivo_estrategico_oe_end" ADD CONSTRAINT "objetivo_estrategico_oe_end_pkey" PRIMARY KEY ("id");
ALTER TABLE "objetivo_estrategico_politica_gobierno" ADD CONSTRAINT "objetivo_estrategico_politica_gobierno_pkey" PRIMARY KEY ("id");
ALTER TABLE "objetivo_estrategico_productos_terminales" ADD CONSTRAINT "objetivo_estrategico_productos_terminales_pkey" PRIMARY KEY ("id");
ALTER TABLE "ods" ADD CONSTRAINT "ods_pkey" PRIMARY KEY ("id");
ALTER TABLE "ods_config" ADD CONSTRAINT "ods_config_pkey" PRIMARY KEY ("id");
ALTER TABLE "organo_publico" ADD CONSTRAINT "organo_publico_pkey" PRIMARY KEY ("id");
ALTER TABLE "otros_compromiso" ADD CONSTRAINT "otros_compromiso_pkey" PRIMARY KEY ("id");
ALTER TABLE "pacc" ADD CONSTRAINT "pacc_pkey" PRIMARY KEY ("id");
ALTER TABLE "pacc_auditoria" ADD CONSTRAINT "pacc_auditoria_pkey" PRIMARY KEY ("id");
ALTER TABLE "pacc_departamental" ADD CONSTRAINT "pacc_departamental_pkey" PRIMARY KEY ("id");
ALTER TABLE "pacc_departamental_detail" ADD CONSTRAINT "pacc_departamental_detail_pkey" PRIMARY KEY ("id");
ALTER TABLE "pacc_departamento_status" ADD CONSTRAINT "pacc_departamento_status_pkey" PRIMARY KEY ("id");
ALTER TABLE "pacc_departamento_status_before" ADD CONSTRAINT "pacc_departamento_status_before_pkey" PRIMARY KEY ("id");
ALTER TABLE "pacc_departamento_status_next" ADD CONSTRAINT "pacc_departamento_status_next_pkey" PRIMARY KEY ("id");
ALTER TABLE "pacc_status" ADD CONSTRAINT "pacc_status_pkey" PRIMARY KEY ("id");
ALTER TABLE "pacc_status_before" ADD CONSTRAINT "pacc_status_before_pkey" PRIMARY KEY ("id");
ALTER TABLE "pacc_status_next" ADD CONSTRAINT "pacc_status_next_pkey" PRIMARY KEY ("id");
ALTER TABLE "pei" ADD CONSTRAINT "pei_pkey" PRIMARY KEY ("id");
ALTER TABLE "pei_estatus" ADD CONSTRAINT "pei_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "pei_poa" ADD CONSTRAINT "pei_poa_pkey" PRIMARY KEY ("id");
ALTER TABLE "periodo" ADD CONSTRAINT "periodo_pkey" PRIMARY KEY ("id");
ALTER TABLE "persona" ADD CONSTRAINT "persona_pkey" PRIMARY KEY ("id");
ALTER TABLE "pesta" ADD CONSTRAINT "pesta_pkey" PRIMARY KEY ("id");
ALTER TABLE "pesta_items" ADD CONSTRAINT "pesta_items_pkey" PRIMARY KEY ("id");
ALTER TABLE "pesta_type" ADD CONSTRAINT "pesta_type_pkey" PRIMARY KEY ("id");
ALTER TABLE "plan_base" ADD CONSTRAINT "plan_base_pkey" PRIMARY KEY ("id");
ALTER TABLE "plan_modules" ADD CONSTRAINT "plan_modules_pkey" PRIMARY KEY ("id");
ALTER TABLE "plan_modules_negative" ADD CONSTRAINT "plan_modules_negative_pkey" PRIMARY KEY ("id");
ALTER TABLE "plan_modules_required" ADD CONSTRAINT "plan_modules_required_pkey" PRIMARY KEY ("id");
ALTER TABLE "plan_precio" ADD CONSTRAINT "plan_precio_pkey" PRIMARY KEY ("id");
ALTER TABLE "plan_precio_descuento" ADD CONSTRAINT "plan_precio_descuento_pkey" PRIMARY KEY ("id");
ALTER TABLE "plan_precio_frecuencia" ADD CONSTRAINT "plan_precio_frecuencia_pkey" PRIMARY KEY ("id");
ALTER TABLE "plan_transaccion" ADD CONSTRAINT "plan_transaccion_pkey" PRIMARY KEY ("id");
ALTER TABLE "plan_transaccion_estatus" ADD CONSTRAINT "plan_transaccion_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "plataforma_financiera" ADD CONSTRAINT "plataforma_financiera_pkey" PRIMARY KEY ("id");
ALTER TABLE "pnpsp" ADD CONSTRAINT "pnpsp_pkey" PRIMARY KEY ("id");
ALTER TABLE "poa" ADD CONSTRAINT "poa_pkey" PRIMARY KEY ("id");
ALTER TABLE "poa_estatus" ADD CONSTRAINT "poa_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "poa_monitoreo" ADD CONSTRAINT "poa_monitoreo_pkey" PRIMARY KEY ("id");
ALTER TABLE "politica_denominacion_pnpsp" ADD CONSTRAINT "politica_denominacion_pnpsp_pkey" PRIMARY KEY ("id");
ALTER TABLE "politica_gobierno" ADD CONSTRAINT "politica_gobierno_pkey" PRIMARY KEY ("id");
ALTER TABLE "presupuesto_aprobado" ADD CONSTRAINT "presupuesto_aprobado_pkey" PRIMARY KEY ("id");
ALTER TABLE "presupuesto_aprobado_estatus" ADD CONSTRAINT "presupuesto_aprobado_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "procedimiento_seleccion" ADD CONSTRAINT "procedimiento_seleccion_pkey" PRIMARY KEY ("id");
ALTER TABLE "procesos" ADD CONSTRAINT "procesos_pkey" PRIMARY KEY ("id");
ALTER TABLE "procesos_categoria" ADD CONSTRAINT "procesos_categoria_pkey" PRIMARY KEY ("id");
ALTER TABLE "procesos_elemento" ADD CONSTRAINT "procesos_elemento_pkey" PRIMARY KEY ("id");
ALTER TABLE "procesos_status" ADD CONSTRAINT "procesos_status_pkey" PRIMARY KEY ("id");
ALTER TABLE "productos_poa" ADD CONSTRAINT "productos_poa_pkey" PRIMARY KEY ("id");
ALTER TABLE "productos_poa_status" ADD CONSTRAINT "productos_poa_status_pkey" PRIMARY KEY ("id");
ALTER TABLE "proyecto_actividad" ADD CONSTRAINT "proyecto_actividad_pkey" PRIMARY KEY ("id");
ALTER TABLE "proyecto_actividad_apoyo" ADD CONSTRAINT "proyecto_actividad_apoyo_pkey" PRIMARY KEY ("id");
ALTER TABLE "proyecto_actividad_estatus" ADD CONSTRAINT "proyecto_actividad_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "proyecto_actividad_mods" ADD CONSTRAINT "proyecto_actividad_mods_pkey" PRIMARY KEY ("id");
ALTER TABLE "proyecto_estatus" ADD CONSTRAINT "proyecto_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "proyecto_item" ADD CONSTRAINT "proyecto_item_pkey" PRIMARY KEY ("id");
ALTER TABLE "proyecto_item_actividad" ADD CONSTRAINT "proyecto_item_actividad_pkey" PRIMARY KEY ("id");
ALTER TABLE "proyecto_item_involucrado" ADD CONSTRAINT "proyecto_item_involucrado_pkey" PRIMARY KEY ("id");
ALTER TABLE "proyecto_item_ods" ADD CONSTRAINT "proyecto_item_ods_pkey" PRIMARY KEY ("id");
ALTER TABLE "prudcto_involucrado" ADD CONSTRAINT "prudcto_involucrado_pkey" PRIMARY KEY ("id");
ALTER TABLE "razon" ADD CONSTRAINT "razon_pkey" PRIMARY KEY ("id");
ALTER TABLE "reporte_indicador_config" ADD CONSTRAINT "reporte_indicador_config_pkey" PRIMARY KEY ("id");
ALTER TABLE "reporte_tipometa_formula" ADD CONSTRAINT "reporte_tipometa_formula_pkey" PRIMARY KEY ("id");
ALTER TABLE "responsable" ADD CONSTRAINT "responsable_pkey" PRIMARY KEY ("id");
ALTER TABLE "responsable_tipo" ADD CONSTRAINT "responsable_tipo_pkey" PRIMARY KEY ("id");
ALTER TABLE "resultado" ADD CONSTRAINT "resultado_pkey" PRIMARY KEY ("id");
ALTER TABLE "resultado_compromiso" ADD CONSTRAINT "resultado_compromiso_pkey" PRIMARY KEY ("id");
ALTER TABLE "resultado_denominacion_pnpsp" ADD CONSTRAINT "resultado_denominacion_pnpsp_pkey" PRIMARY KEY ("id");
ALTER TABLE "resultado_linea_accion" ADD CONSTRAINT "resultado_linea_accion_pkey" PRIMARY KEY ("id");
ALTER TABLE "resultado_mods" ADD CONSTRAINT "resultado_mods_pkey" PRIMARY KEY ("id");
ALTER TABLE "resultado_otros_compromisos" ADD CONSTRAINT "resultado_otros_compromisos_pkey" PRIMARY KEY ("id");
ALTER TABLE "resultado_supuesto" ADD CONSTRAINT "resultado_supuesto_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo" ADD CONSTRAINT "riesgo_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_a" ADD CONSTRAINT "riesgo_a_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_control" ADD CONSTRAINT "riesgo_control_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_entidad" ADD CONSTRAINT "riesgo_entidad_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_estatus" ADD CONSTRAINT "riesgo_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_historico" ADD CONSTRAINT "mapa_proceso_copy1_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_impacto" ADD CONSTRAINT "riesgo_impacto_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_mamfe_estatus" ADD CONSTRAINT "riesgo_mamfe_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_matriz" ADD CONSTRAINT "riesgo_matriz_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_matriz_control" ADD CONSTRAINT "riesgo_matriz_control_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_matriz_model" ADD CONSTRAINT "riesgo_matriz_model_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_probabilidad" ADD CONSTRAINT "riesgo_probabilidad_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_resultado" ADD CONSTRAINT "riesgo_resultado_pkey" PRIMARY KEY ("id");
ALTER TABLE "riesgo_resultado_amfe" ADD CONSTRAINT "riesgo_resultado_copy1_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_eje_sectorial" ADD CONSTRAINT "sec_eje_sectorial_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_eje_sectorial_end_borrada" ADD CONSTRAINT "sec_eje_sectorial_end_borrada_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_objetivo_sectorial" ADD CONSTRAINT "sec_objetivo_sectorial_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_objetivo_sectorial_eje_estrategico" ADD CONSTRAINT "sec_objetivo_sectorial_eje_estrategico_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_objetivo_sectorial_end_borrada" ADD CONSTRAINT "sec_objetivo_sectorial_end_borrada_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_productos_terminales_borrada" ADD CONSTRAINT "sec_productos_terminales_borrada_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_productos_terminales_estatus_borrada" ADD CONSTRAINT "sec_productos_terminales_estatus_borrada_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_productos_terminales_involucrados_borrada" ADD CONSTRAINT "sec_productos_terminales_involucrados_borrada_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_productos_terminales_responsable_borrada" ADD CONSTRAINT "sec_productos_terminales_responsable_borrada_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_programa_sectorial" ADD CONSTRAINT "sec_programa_sectorial_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_programa_sectorial_eje_estrategico" ADD CONSTRAINT "sec_programa_sectorial_eje_estrategico_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_programa_sectorial_estatus" ADD CONSTRAINT "sec_programa_sectorial_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_programa_sectorial_finazas" ADD CONSTRAINT "sec_programa_sectorial_finazas_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_programa_sectorial_involucrados" ADD CONSTRAINT "sec_programa_sectorial_involucrados_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_programa_sectorial_objetivo_especifico" ADD CONSTRAINT "sec_programa_sectorial_objetivo_especifico_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_programa_sectorial_responsable" ADD CONSTRAINT "sec_programa_sectorial_responsable_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_resultado_sectorial" ADD CONSTRAINT "sec_resultado_sectorial_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_resultado_sectorial_end_borrada" ADD CONSTRAINT "sec_resultado_sectorial_end_borrada_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_resultado_sectorial_estatus" ADD CONSTRAINT "sec_resultado_sectorial_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_resultado_sectorial_involucrados" ADD CONSTRAINT "sec_resultado_sectorial_involucrados_pkey" PRIMARY KEY ("id");
ALTER TABLE "sec_resultado_sectorial_responsable" ADD CONSTRAINT "sec_resultado_sectorial_responsable_pkey" PRIMARY KEY ("id");
ALTER TABLE "sector" ADD CONSTRAINT "sector_pkey" PRIMARY KEY ("id");
ALTER TABLE "ser_salida" ADD CONSTRAINT "ser_salida_pkey" PRIMARY KEY ("id");
ALTER TABLE "ser_salida_comentario" ADD CONSTRAINT "ser_salida_comentario_pkey" PRIMARY KEY ("id");
ALTER TABLE "ser_salida_estatus" ADD CONSTRAINT "ser_salida_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "ser_salida_tipo" ADD CONSTRAINT "ser_salida_tipo_pkey" PRIMARY KEY ("id");
ALTER TABLE "ser_servicio" ADD CONSTRAINT "ser_servicio_pkey" PRIMARY KEY ("id");
ALTER TABLE "ser_tipo_servicio" ADD CONSTRAINT "ser_tipo_servicio_pkey" PRIMARY KEY ("id");
ALTER TABLE "solicitud_documento" ADD CONSTRAINT "solicitud_documento_pkey" PRIMARY KEY ("id");
ALTER TABLE "solicitud_documento_actividades" ADD CONSTRAINT "solicitud_documento_actividades_pkey" PRIMARY KEY ("id");
ALTER TABLE "solicitud_documento_area" ADD CONSTRAINT "solicitud_documento_area_pkey" PRIMARY KEY ("id");
ALTER TABLE "solicitud_documento_tipo_accion" ADD CONSTRAINT "solicitud_documento_tipo_accion_pkey" PRIMARY KEY ("id");
ALTER TABLE "solicitud_proceso" ADD CONSTRAINT "solicitud_proceso_pkey" PRIMARY KEY ("id");
ALTER TABLE "supuestos" ADD CONSTRAINT "supuestos_pkey" PRIMARY KEY ("id");
ALTER TABLE "supuestos_tipo" ADD CONSTRAINT "supuestos_tipo_pkey" PRIMARY KEY ("id");
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_pkey" PRIMARY KEY ("id");
ALTER TABLE "ticket_estatus" ADD CONSTRAINT "ticket_estatus_pkey" PRIMARY KEY ("id");
ALTER TABLE "ticket_respuesta" ADD CONSTRAINT "ticket_respuesta_pkey" PRIMARY KEY ("id");
ALTER TABLE "ticket_type" ADD CONSTRAINT "ticket_type_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_accion" ADD CONSTRAINT "tipo_accion_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_auditores" ADD CONSTRAINT "tipo_auditores_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_auditorias" ADD CONSTRAINT "tipo_auditorias_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_comentario" ADD CONSTRAINT "tipo_comentario_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_compromiso" ADD CONSTRAINT "tipo_compromiso_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_cuenta" ADD CONSTRAINT "tipo_cuenta_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_documento" ADD CONSTRAINT "tipo_documento_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_inconformidad" ADD CONSTRAINT "tipo_inconformidad_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_institucion" ADD CONSTRAINT "tipo_institucion_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_inversion" ADD CONSTRAINT "tipo_inversion_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_procedimiento" ADD CONSTRAINT "tipo_procedimiento_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_razon" ADD CONSTRAINT "tipo_razon_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_resultado" ADD CONSTRAINT "tipo_resultado_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_riesgo" ADD CONSTRAINT "tipo_riesgo_pkey" PRIMARY KEY ("id");
ALTER TABLE "tipo_rol_auditores" ADD CONSTRAINT "tipo_rol_auditores_pkey" PRIMARY KEY ("id");
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id");
ALTER TABLE "usuario_copy1" ADD CONSTRAINT "usuario_copy1_pkey" PRIMARY KEY ("id");
ALTER TABLE "usuario_departamento" ADD CONSTRAINT "usuario_departamento_pkey" PRIMARY KEY ("id");
ALTER TABLE "value_value" ADD CONSTRAINT "value_value_pkey" PRIMARY KEY ("id");
ALTER TABLE "viceministerios" ADD CONSTRAINT "viceministerios_pkey" PRIMARY KEY ("id");
ALTER TABLE "ws_connection" ADD CONSTRAINT "ws_connection_pkey" PRIMARY KEY ("id");
ALTER TABLE "ws_connection_field" ADD CONSTRAINT "ws_connection_field_pkey" PRIMARY KEY ("id");
ALTER TABLE "ws_periods" ADD CONSTRAINT "ws_periods_pkey" PRIMARY KEY ("id");
ALTER TABLE "auditoria_programa_plan_equipotrabajo" ADD CONSTRAINT "auditoria_programa_plan_equipotrabajo_programa_plan_fkey" FOREIGN KEY ("programa_plan") REFERENCES "public"."auditoria_programa_plan" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
