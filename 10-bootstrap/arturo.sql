SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `syplansqa2coraasan`.`compania` ADD COLUMN `maneja_notificaciones` tinyint(1) NULL DEFAULT NULL AFTER `meneja_estatus_producto_por_actividades`;

ALTER TABLE `syplansqa2coraasan`.`mepydreports` MODIFY COLUMN `compania_base` int(11) NOT NULL DEFAULT 0 AFTER `compania`;

ALTER TABLE `syplansqa2coraasan`.`mepydreports` MODIFY COLUMN `impacto` varchar(23) NOT NULL DEFAULT '' AFTER `politica_gobierno`;

ALTER TABLE `syplansqa2coraasan`.`mepydreports` MODIFY COLUMN `total` decimal(40, 2) NOT NULL DEFAULT 0.00 AFTER `departamento`;

ALTER TABLE `syplansqa2coraasan`.`mepydreports` MODIFY COLUMN `poa` int(11) NOT NULL DEFAULT 0 AFTER `total`;

ALTER TABLE `syplansqa2coraasan`.`modulo_notificacion` ADD COLUMN `active` tinyint(1) NULL DEFAULT NULL AFTER `field_fechacondition`;

CREATE TABLE `syplansqa2coraasan`.`zzcacho_vw_actividades_auth_poa`  (
  `id` int(11) NOT NULL DEFAULT 0,
  `no2` varchar(29) NULL DEFAULT NULL,
  `actividad` varchar(1000) NULL DEFAULT NULL,
  `presupuesto` decimal(18, 2) NOT NULL DEFAULT 0.00,
  `fecha_inicio` date NULL DEFAULT NULL,
  `fecha_fin` date NULL DEFAULT NULL,
  `poa` int(11) NOT NULL DEFAULT 0,
  `estatus_actividad` int(11) NULL DEFAULT NULL,
  `nombre` varchar(255) NULL DEFAULT NULL,
  `producto` int(11) NOT NULL DEFAULT 0
);

CREATE TABLE `syplansqa2coraasan`.`zzcacho_vw_actividades_poa`  (
  `id` int(11) NOT NULL DEFAULT 0,
  `fechacompletada` timestamp NULL DEFAULT NULL,
  `compania` int(11) NULL DEFAULT NULL,
  `institucion` int(11) NULL DEFAULT NULL,
  `departamento_active` tinyint(1) NULL DEFAULT NULL,
  `entidad` bigint(11) NULL DEFAULT NULL,
  `no_eje` int(11) NULL DEFAULT NULL,
  `eje_estrategico` varchar(255) NULL DEFAULT '',
  `id_eje_estrategico` int(11) NOT NULL DEFAULT 0,
  `no_objetivo` varchar(9) NULL DEFAULT NULL,
  `objetivo_estrategico` varchar(1000) NULL DEFAULT '',
  `id_objetivo_estrategico` int(11) NOT NULL DEFAULT 0,
  `no_estrategia` varchar(14) NULL DEFAULT NULL,
  `estrategia` varchar(255) NULL DEFAULT NULL,
  `id_estrategia` int(11) NOT NULL DEFAULT 0,
  `no_resultado` varchar(19) NULL DEFAULT NULL,
  `resultado_esperado` varchar(255) NULL DEFAULT NULL,
  `id_resultado` int(11) NOT NULL DEFAULT 0,
  `perspectiva` int(11) NULL DEFAULT NULL,
  `no1` varchar(24) NULL DEFAULT NULL,
  `no2` varchar(29) NULL DEFAULT NULL,
  `producto` int(11) NOT NULL DEFAULT 0,
  `producto_nombre` varchar(255) NULL DEFAULT NULL,
  `actividad` varchar(1000) NULL DEFAULT NULL,
  `nombre` text NULL,
  `responsable` varchar(511) NULL DEFAULT NULL,
  `responsable_id` int(11) NOT NULL DEFAULT 0,
  `responsable_correo` varchar(255) NULL DEFAULT NULL,
  `fecha_inicio` date NULL DEFAULT NULL,
  `month_inicio` int(2) NULL DEFAULT NULL,
  `month_fin` int(2) NULL DEFAULT NULL,
  `fecha_fin` date NULL DEFAULT NULL,
  `presupuesto` decimal(18, 2) NOT NULL DEFAULT 0.00,
  `presupuesto_consumido` decimal(18, 2) NOT NULL DEFAULT 0.00,
  `presupuesto_real` decimal(40, 2) NULL DEFAULT NULL,
  `presupuesto_real_no` decimal(19, 2) NOT NULL DEFAULT 0.00,
  `presupuesto_ver` decimal(18, 2) NOT NULL DEFAULT 0.00,
  `presupuesto_consumido_ver` decimal(18, 2) NOT NULL DEFAULT 0.00,
  `poa` int(11) NOT NULL DEFAULT 0,
  `poa_activo` int(11) NULL DEFAULT NULL,
  `comentario` text NULL,
  `razon` int(11) NULL DEFAULT NULL,
  `completa` tinyint(1) NULL DEFAULT NULL,
  `departamento` varchar(11) NULL DEFAULT NULL,
  `departamento_nombre_2` varchar(500) NULL DEFAULT NULL,
  `originalid` int(11) NULL DEFAULT NULL,
  `id_estatus_departamento` int(11) NULL DEFAULT NULL,
  `estado_producto_id` int(11) NULL DEFAULT NULL,
  `condicion_producto` varchar(12) NULL DEFAULT NULL,
  `estatus_actividad` int(11) NULL DEFAULT NULL,
  `estatus` varchar(255) NULL DEFAULT NULL,
  `condition` varchar(12) NULL DEFAULT NULL,
  `dpto_estatus` bigint(11) NOT NULL DEFAULT 0,
  `tipo_inversion_id` int(11) NULL DEFAULT NULL,
  `bienes_permiso` varchar(1000) NULL DEFAULT NULL,
  `bienes_permiso_nombre` varchar(1000) NULL DEFAULT NULL,
  `presupuestario` varchar(1000) NULL DEFAULT NULL,
  `presupuestario_nombre` varchar(1000) NULL DEFAULT NULL,
  `tipo_inversion` varchar(255) NULL DEFAULT NULL,
  `maneja_presupuesto` tinyint(11) NULL DEFAULT NULL,
  `avance_porcentaje` decimal(18, 2) NULL DEFAULT NULL,
  `puede_completar` varchar(2) NULL DEFAULT NULL,
  `comentarios` bigint(21) NULL DEFAULT NULL,
  `act_apoyo` bigint(21) NULL DEFAULT NULL,
  `act_apoyo_has` bigint(21) NULL DEFAULT NULL,
  `act_apoyo_has_one_complete` bigint(21) NULL DEFAULT NULL,
  `presupuesto_restante` decimal(41, 2) NOT NULL DEFAULT 0.00,
  `actividades_apoyo_export` mediumtext NULL,
  `involucrados` char(0) NOT NULL DEFAULT '',
  `involucrados_export` mediumtext NULL,
  `calificacion` varchar(255) NULL DEFAULT NULL,
  `razon_nombre` varchar(255) NULL DEFAULT NULL,
  `county` bigint(21) NULL DEFAULT NULL
);

CREATE TABLE `syplansqa2coraasan`.`zzcacho_vw_mega_indicadores_poa`  (
  `id` int(11) NOT NULL DEFAULT 0,
  `no_eje` int(11) NULL DEFAULT NULL,
  `eje_estrategico` varchar(255) NULL DEFAULT '',
  `id_eje_estrategico` int(11) NOT NULL DEFAULT 0,
  `no_objetivo` text NULL,
  `objetivo_estrategico` varchar(1000) NULL DEFAULT '',
  `id_objetivo_estrategico` int(11) NOT NULL DEFAULT 0,
  `no_estrategia` text NULL,
  `estrategia` varchar(255) NULL DEFAULT NULL,
  `id_estrategia` int(11) NOT NULL DEFAULT 0,
  `no_resultado` text NULL,
  `resultado_esperado` varchar(255) NULL DEFAULT NULL,
  `id_resultado_esperado` int(11) NOT NULL DEFAULT 0,
  `no_producto` text NULL,
  `producto` varchar(255) NULL DEFAULT NULL,
  `no_indicador` text NULL,
  `nombre_indicador` varchar(255) NULL DEFAULT NULL,
  `descripcion` varchar(4000) NULL DEFAULT NULL,
  `fuente` varchar(255) NULL DEFAULT NULL,
  `metodo` varchar(255) NULL DEFAULT NULL,
  `linea` varchar(255) NULL DEFAULT NULL,
  `medio_verificacion` varchar(1000) NULL DEFAULT NULL,
  `poa` int(11) NULL DEFAULT NULL,
  `tipo_meta` int(11) NULL DEFAULT NULL,
  `direccion_meta` int(11) NULL DEFAULT NULL,
  `departamento_id` int(11) NULL DEFAULT 0,
  `producto_id` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `ano_linea_base` int(11) NULL DEFAULT NULL,
  `caracteristica` int(11) NULL DEFAULT NULL,
  `desagregacion_demografica_geografia` text NULL,
  `observacion` text NULL
);

CREATE TABLE `syplansqa2coraasan`.`zzcacho_vw_mega_presupuesto_aprobado`  (
  `id` int(11) NOT NULL DEFAULT 0,
  `poa` int(10) UNSIGNED NULL DEFAULT NULL,
  `nombre` varchar(500) NULL DEFAULT NULL,
  `departamento_id` int(11) NOT NULL DEFAULT 0,
  `asignado` decimal(18, 2) NULL DEFAULT NULL,
  `id_estatus` bigint(11) NOT NULL DEFAULT 0,
  `consumido` decimal(40, 2) NOT NULL DEFAULT 0.00,
  `por_asignar` decimal(41, 2) NULL DEFAULT NULL,
  `estatus` varchar(255) NULL DEFAULT NULL,
  `estatus_id` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
);

CREATE TABLE `syplansqa2coraasan`.`zzcacho_vw_productos_auth_poa`  (
  `id` int(11) NOT NULL DEFAULT 0,
  `no1` text NULL,
  `producto` varchar(255) NULL DEFAULT NULL,
  `fecha_inicio_f` date NULL DEFAULT NULL,
  `fecha_inicio` date NULL DEFAULT NULL,
  `fecha_fin_f` date NULL DEFAULT NULL,
  `fecha_fin` date NULL DEFAULT NULL,
  `poa_id` int(11) NOT NULL DEFAULT 0,
  `estado_en_producto` int(11) NULL DEFAULT NULL,
  `nombre` varchar(255) NULL DEFAULT NULL
);

CREATE OR REPLACE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `syplansqa2coraasan`.`vw_aii_generico` AS SELECT
	'' AS `id`,
	`c`.`id` AS `compania`,
	`i`.`id` AS `institucion`,
	'' AS `departamento`,
	'' AS `departamento_nombre`,
	'' AS `r1`,
	'' AS `r2`,
	ifnull( `i`.`nombre`, `c`.`nombre` ) AS `entidad`,
	'' AS `denominacion`,
	`ip`.`nombre` AS `indicador`,
	`ip`.`id` AS `indicador_id`,
	ifnull( `ip`.`ano_linea_base`, 'N/A' ) AS `ano`,
	ifnull( `ip`.`linea_base`, 'N/A' ) AS `valor`,
	YEAR (
	now()) AS `periodo_poa`,
	'' AS `poa`,
	group_concat( concat( `a`.`periodo`, '=', `a`.`valor` ) SEPARATOR ';' ) AS `anos`,
group_concat( concat( `a`.`periodo`, '=', `a`.`valor_alcanzado` ) SEPARATOR ';' ) AS `anos_a`,
`ip`.`tipo_meta` AS `tipo_meta`,
`moni`.`cantidad` AS `monitoreo`,
`moni`.`nombre_mostrar` AS `monitoreo_nombre`,
`ip`.`direccion_meta` AS `dir` ,
ip.table_
FROM

							`indicador_generico` `ip`
						JOIN `indicador_generico_periodo` `a` ON 
								`a`.`indicador_generico` = `ip`.`id` 
				JOIN `compania` `c` ON 
						`c`.`id` = `ip`.`compania` 
			JOIN `poa_monitoreo` `moni` ON 
					`moni`.`id` = `ip`.`poa_monitoreo` 

		LEFT JOIN `institucion` `i` ON 
				`i`.`id` = `ip`.`institucion` 

GROUP BY
	`indicador` 
ORDER BY
	`r1`,
	`r2` ;

CREATE OR REPLACE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `syplansqa2coraasan`.`vw_dashboard_procesos` AS SELECT DISTINCT mp.id,
    mp.compania,
    mp.institucion,
    ( SELECT count(0) AS count
           FROM vw_procesos_grid proc
          WHERE ((proc.mapa_proceso = mp.id) AND (ifnull(proc.estatus_id, 0) = 0) AND (ifnull(proc.proceso_general, 0) = 0))) AS pendientes,
    ( SELECT count(0) AS count
           FROM vw_procesos_grid proc
          WHERE ((proc.mapa_proceso = mp.id) AND (ifnull(proc.estatus_id, 0) = 1) AND (ifnull(proc.proceso_general, 0) = 0))) AS iniciados,
    ( SELECT count(0) AS count
           FROM vw_procesos_grid proc
          WHERE ((proc.mapa_proceso = mp.id) AND (ifnull(proc.estatus_id, 0) = 2) AND (ifnull(proc.proceso_general, 0) = 0))) AS completados,
    ( SELECT count(0) AS count
           FROM vw_procesos_grid proc
          WHERE ((proc.mapa_proceso = mp.id) AND (ifnull(proc.estatus_id, 0) = 3) AND (ifnull(proc.proceso_general, 0) = 0))) AS autorizados,
    ( SELECT count(0) AS count
           FROM vw_procesos_grid proc
          WHERE ((proc.mapa_proceso = mp.id) AND ((ifnull(proc.estatus_id, 0) <> 4) AND ifnull(proc.proceso_general, 0) = 0))) AS cantidad
   FROM mapa_proceso mp ;

CREATE OR REPLACE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `syplansqa2coraasan`.`vw_documentos_asociados_mp` AS SELECT DISTINCT
	`pc`.`compania` AS `compania`,
	`pc`.`institucion` AS `institucion`,
	pc.mapa_proceso,
	`pc`.`nombre` AS `nombre_mapa`,
	`p`.`nombre` AS `nombre_proceso`,
	`p`.`responsable` AS `id_responsable_proceso`,
	concat( `u`.`nombre`, ' ', `u`.`apellido` ) AS `responsable_proceso`,
	`da`.`id` AS `id`,
	`da`.`codigo` AS `codigo`,
	`da`.`nombre` AS `nombre`,
	`da`.`estatus` AS `estatus_id`,
	`appe`.`nombre` AS `estatus`,
	`e`.`nombre` AS `documento_estatus`,
	concat( `p`.`nombre`, ' - ', `da`.`nombre` ) AS `nombre_drp`,
	`da`.`descripcion` AS `descripcion`,
	`da`.`proceso` AS `proceso`,
	`da`.`procesos_categoria` AS `procesos_categoria`,
	`da`.`creado_por` AS `creado_por`,
	(
	SELECT
		concat( `u`.`nombre`, ' ', `u`.`apellido` ) 
	FROM
		`usuario` `u` 
	WHERE
		( `u`.`id` = `da`.`creado_por` ) 
	) AS `creado_por_nombre`,
	`da`.`creado_en` AS `creado_en`,
	`da`.`aprobado_por` AS `aprobado_por`,
	(
	SELECT
		concat( `u`.`nombre`, ' ', `u`.`apellido` ) 
	FROM
		`usuario` `u` 
	WHERE
		( `u`.`id` = `da`.`aprobado_por` ) 
	) AS `aprobado_por_nombre`,
	`tp`.`nombre` AS `tipo_documento`,
	`da`.`tipo_documento` AS `tipo_documento_id`,
	`da`.`aprobado_en` AS `aprobado_en`,
	`da`.`observacion` AS `observacion`,
	`da`.`tempid` AS `tempid`,
	`da`.`active` AS `active`,
	`da`.`solicitud_documento` AS `solicitud_documento`,
	(
	SELECT
		concat( `u`.`nombre`, ' ', `u`.`apellido` ) 
	FROM
		`usuario` `u` 
	WHERE
		( `u`.`id` = `sd`.`solicitante` ) 
	) AS `solicitante_nombre`,
	(
	SELECT
		`d`.`nombre` 
	FROM
		( `usuario` `u` JOIN `departamento` `d` ON ( ( `d`.`id` = `u`.`departamento` ) ) ) 
	WHERE
		( `u`.`id` = `sd`.`solicitante` ) 
	) AS `solicitante_departamento`,
	sd.solicitante AS solicitante,
	`sd`.`fecha_solicitud` AS `fecha_solicitud`,
	`sd`.`nombre` AS `solicitud_documento_nombre`,
	`da`.`alcance` AS `alcance`,
	`da`.`objetivo` AS `objetivo`,
	`da`.`resultado_esperado` AS `resultado_esperado`,
	`da`.`marco_legal` AS `marco_legal`,
	`da`.`trabaja_marco_legal` AS `trabaja_marco_legal`,
	`da`.`folder` AS `folder`,
	`dl`.`version` AS `version`,
	 d.id AS responsable_proceso_departamento_id,
	`d`.`nombre` AS `responsable_proceso_departamento`,
	da.documento_general AS documento_general,
	da.version AS version_documento,
	da.es_confidencial AS es_confidencial 
FROM
	(
		(
			(
				(
					(
						(
							(
								(
									( `documentos_asociados` `da` LEFT JOIN `tipo_documento` `tp` ON ( ( `tp`.`id` = `da`.`tipo_documento` ) ) )
									LEFT JOIN `auditoria_programa_plan_estatus` `appe` ON ( ( ( `appe`.`code` = `da`.`estatus` ) AND ( `appe`.`entidad` = 2 ) ) ) 
								)
								LEFT JOIN `procesos` `p` ON ( ( `p`.`id` = `da`.`proceso` ) ) 
							)
							LEFT JOIN `usuario` `u` ON ( ( `u`.`id` = `p`.`responsable` ) ) 
						)
						LEFT JOIN `procesos_categoria` `pc` ON ( ( `pc`.`id` = `p`.`procesos_categoria` ) ) 
					)
					LEFT JOIN `auditoria_programa_plan_estatus` `e` ON ( ( ( `e`.`code` = `da`.`estatus` ) AND ( `e`.`entidad` = 2 ) ) ) 
				)
				LEFT JOIN `solicitud_documento` `sd` ON ( ( `sd`.`id` = `da`.`solicitud_documento` ) ) 
			)
			LEFT JOIN `documental` `dl` ON ( ( `dl`.`root` = `da`.`folder` ) ) 
		)
		LEFT JOIN `departamento` `d` ON ( ( `d`.`id` = `u`.`departamento` ) ) 
	) 
WHERE
	ifnull( da.documento_general, 0 ) = 0 ;

CREATE OR REPLACE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `syplansqa2coraasan`.`vw_modulo_notificacion` AS select 
	n.*,
	c.maneja_notificaciones,
	GROUP_CONCAT(mr.a_clone_group SEPARATOR ';') roles,
	GROUP_CONCAT(u.id SEPARATOR ';') usuarios
from 
	modulo_notificacion n
	left join compania c on c.id= n.compania
left join modulo_notificacion_group mr on mr.modulo_notificacion=n.id
left join modulo_notificacion_usuario mu on mu.modulo_notificacion=n.id
left join usuario u on u.id=mu.usuario
left join a_clone_group r on r.id=mr.a_clone_group
left join auditoria_programa_estatus e on e.id=n.field_estatus 
group by n.id ;

CREATE OR REPLACE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `syplansqa2coraasan`.`vw_permission_generico` AS SELECT
	`ip`.`compania` AS `compania`,
	`t`.`indicador_generico` AS `indicador_generico`,
	`t`.`indicador_generico` AS `indicador`,
	ifnull( `t`.`condition`, 0 ) AS `condition`,
	ifnull( ip.ano, 0 ) AS `ano_poa`,
	YEAR (
	now()) AS `actual`,
	`t`.`periodo` AS `periodo`,
	MONTH (
	now()) AS `mes`,
	ceiling((
			MONTH (
			now()) / ( 12 / `m`.`cantidad` ))) AS `periodo_actual`,
	`m`.`nombre_mostrar` AS `nombre_mostrar`,
	1 AS `poa_activo`,
	`t`.`valor_alcanzado` AS `valor_alcanzado`,(
	CASE
			
			WHEN ( 1 = 0 ) THEN
			0 
			WHEN ( `t`.`condition` = 1 ) THEN
			1 
			WHEN ((
					1 = 1 
					) 
				AND (
					ifnull( ip.ano, 0 ) < YEAR (
					now())) 
				AND isnull( `t`.`valor_alcanzado` )) THEN
				1 
				WHEN ((
						1 = 1 
						) 
					AND (
						ifnull( ip.ano, 0 ) = YEAR (
						now())) 
					AND ( ceiling(( MONTH ( now()) / ( 12 / `m`.`cantidad` ))) = `t`.`periodo` )) THEN
					1 
					WHEN ((
							1 = 1 
							) 
						AND (
							ifnull( ip.ano, 0 ) <= YEAR (
							now())) 
						AND (
							`t`.`periodo` <= ceiling((
									MONTH (
									now()) / ( 12 / `m`.`cantidad` )))) 
						AND isnull( `t`.`valor_alcanzado` )) THEN
						1 ELSE 0 
					END 
						) AS `allow`,(
					CASE
							
							WHEN ( 1 = 0 ) THEN
							concat( 'No puede modificar debido a que el año: ', '', ' del año ', ifnull( ip.ano, 0 ), ' no está activo' ) 
							WHEN ( `t`.`condition` = 1 ) THEN
							concat( 'Puede modificar debido a que el indicador: ', `ip`.`nombre`, ' está en revisión' ) 
							WHEN (
								(
									ifnull( ip.ano, 0 ) < YEAR (
									now())) 
								AND isnull( `t`.`valor_alcanzado` )) THEN
								concat( 'Puede modificar debido a que el año del indicador(', ip.ano, ') es menor al año actual(', YEAR ( now()), ') y el valor alcanzado es "', `t`.`valor_alcanzado`, '"' ) 
								WHEN (
									(
										ifnull( ip.ano, 0 ) = YEAR (
										now())) 
									AND ( ceiling(( MONTH ( now()) / ( 12 / `m`.`cantidad` ))) = `t`.`periodo` )) THEN
									concat(
										'Puede modificar debido a que el año del indicador(',
										ifnull( ip.ano, 0 ),
										') es igual al año actual(',
										YEAR (
										now()),
										') y el ',
										`m`.`nombre_mostrar`,
										' (',
										`t`.`periodo`,
										') es el actual' 
									) 
									WHEN (
										(
											ifnull( ip.ano, 0 ) <= YEAR (
											now())) 
										AND (
											`t`.`periodo` <= ceiling((
													MONTH (
													now()) / ( 12 / `m`.`cantidad` )))) 
										AND isnull( `t`.`valor_alcanzado` )) THEN
										concat(
											'Puede modificar debido a que el año del indicador(',
											ifnull( ip.ano, 0 ),
											') es menor o igual al año actual(',
											YEAR (
											now()),
											') y el ',
											`m`.`nombre_mostrar`,
											' (',
											`t`.`periodo`,
											' ya pasó más que el valor alcanzado es 0' 
											) ELSE concat(
											'Que no pueda modificar puede ser debido a varias razones tales como: el año del indicador(',
											ifnull( ip.ano, 0 ),
											') debe ser igual al año actual(',
											YEAR (
											now()),
											'), que el ',
											`m`.`nombre_mostrar`,
											' no es el actual y/o si es una fecha que ya pasó, el valor alcanzado ya fue registrado con "',
											`t`.`valor_alcanzado`,
											'"' 
										) 
									END 
									) AS `debug`,
									ip.table_,
									(
									CASE
											
											WHEN ((
													`ip`.`ano` >= YEAR (
													now())) 
												AND (
													`t`.`periodo` > ceiling((
															MONTH (
															now()) / ( 12 / `m`.`cantidad` ))))) THEN
												1 ELSE 0 
											END 
											) AS `sinllegar` 
										FROM
											`indicador_generico_periodo` `t`
										JOIN `indicador_generico` `ip` ON `ip`.`id` = `t`.`indicador_generico`
	LEFT JOIN `poa_monitoreo` `m` ON `m`.`id` = `ip`.`poa_monitoreo` ;

CREATE OR REPLACE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `syplansqa2coraasan`.`vw_report_indicadores_generico` AS SELECT DISTINCT
	c.id AS compania,
	t1.nombre AS pnpsp,
	t2.nombre AS mods,
	t3.nombre AS linea_accion,
	t4.nombre AS resultado_sectorial,
	t5.nombre AS programa_sectorial,
	t6.nombre AS proceso,
	t7.nombre AS proyecto,
	t8.nombre AS evento,
	t10.nombre AS salida,
	t11.nombre AS riesgo,
	t9.nombre AS ods,
	NULL AS institucion,
	i.id,
	i.table_,
	i.id AS indicador_generico_id,
	concat((
		SELECT
			count( 0 ) AS count 
		FROM
			indicador_generico t 
		WHERE
			t.table_ = i.table_ 
			AND t.id <= i.id 
			),
		' ',
		i.nombre 
	) AS indicador_generico,
	ifnull( i.ano, 0 ) AS ano,
	i.tipo_meta,
	i.direccion_meta,
	y.periodo,
	y.valor,
	y.valor_alcanzado,
	i.descripcion,
	i.fuente,
	i.metodo_calculo,
	i.ano_linea_base,
	i.linea_base,
	i.medio_verificacion,
	0 AS poa,
	d.nombre AS departamento,
	i.departamento AS departamento_id,
	t6.nombre_mapa ,
	i.related
FROM
	indicador_generico i
	LEFT JOIN departamento d ON d.id = i.departamento
	JOIN compania c ON c.id = i.compania
	JOIN indicador_generico_periodo y ON y.indicador_generico = i.id
	LEFT JOIN vw_denominacion_pnpsp_gg t1 ON t1.id = i.registro 
	AND i.table_ = 2
	LEFT JOIN vw_mods t2 ON t2.id = i.registro 
	AND i.table_ = 3
	LEFT JOIN vw_linea_accion_gg t3 ON t3.id = i.registro 
	AND i.table_ = 4
	LEFT JOIN sec_resultado_sectorial t4 ON t4.id = i.registro 
	AND i.table_ = 6
	LEFT JOIN sec_resultado_sectorial t5 ON t5.id = i.registro 
	AND i.table_ = 7
	LEFT JOIN vw_ods t9 ON t9.id = i.registro 
	AND i.table_ = 8
	LEFT JOIN vw_procesos t6 ON t6.id = i.registro 
	AND i.table_ = 10
	LEFT JOIN vw_proyecto_item t7 ON t7.id = i.registro 
	AND i.table_ = 9
	LEFT JOIN vw_evento_indicador t8 ON t8.id = concat('r',i.registro)  AND i.table_ = 11 and i.related =1
	LEFT JOIN vw_evento_indicador t10 ON t10.id = concat('s',i.registro)  AND i.table_ = 11 and i.related =2
	LEFT JOIN vw_evento_indicador t11 ON t11.id = concat('g',i.registro)  AND i.table_ = 11 and i.related =3 ;

CREATE OR REPLACE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `syplansqa2coraasan`.`vw_usuario_compania_pei_poa` AS SELECT
	`u`.`id` AS `usuario_id`,
	`u`.`id` AS `id`,
	concat( `u`.`nombre`, ' ', `u`.`apellido` ) AS `usuario`,
	`u`.`correo` AS `correo`,
	`u1`.`correo` AS `admin_correo`,
	`u`.`password` AS `password`,
	`c`.`id` AS `compania_id`,
	`c`.`sector` AS `sector_id`,
	`u`.`institucion` AS `institucion_id`,
	`c`.`nombre` AS `compania`,
	`i`.`nombre` AS `institucion`,
	`u`.`tipo_auditor` AS `tipo_auditor`,
	`c`.`sigla` AS `sigla`,
	`c`.`maneja_pacc` AS `maneja_pacc`,
	`c`.`maneja_ods` AS `maneja_ods`,
	`c`.`meneja_estatus_producto_por_actividades` AS `meneja_estatus_producto_por_actividades`,
	`pe`.`id` AS `pei_id`,
	`pe`.`nombre` AS `pei`,
	`pe`.`periodo_desde` AS `periodo_desde`,
	`pe`.`periodo_hasta` AS `periodo_hasta`,
	ifnull( `pe`.`activo`, 0 ) AS `estatus`,
	`pe`.`estatus` AS `est_pei`,
	`po`.`id` AS `poa_id`,
	`po`.`nombre` AS `poa`,
	`po`.`periodo_poa` AS `periodo_poa`,
	ifnull( `po`.`activo`, 0 ) AS `estado`,
	1 AS `poa_initial`,
	`po`.`estado` AS `est_poa`,
	`pm`.`id` AS `monitoreo_id`,
	`pm`.`nombre_mostrar` AS `monitoreo_nombre`,
	`pm`.`cantidad` AS `cantidad`,
	`me`.`id` AS `marco_estrategico`,
	`u`.`departamento` AS `departamento`,
	`d`.`nombre` AS `departamento_nombre`,
	0 AS `presupuesto_institucional`,
	0 AS `presupuesto_restante`,
	0 AS `presupuesto_liberado`,
	`pay`.`id` AS `presupuesto_id`,
	`u`.`active` AS `active`,
	`u`.`viceministerio` AS `viceministerio`,
	`u`.`direccion_general` AS `direccion_general`,
	`u`.`direccion_area` AS `direccion_area`,
IF
	( ( `pe`.`activo` <> 1 ), 'No existe PEI activo', concat( 'PEI ', `pe`.`periodo_desde`, ' - ', `pe`.`periodo_hasta` ) ) AS `periodo_pei_msj`,
IF
	( ( `po`.`activo` <> 1 ), 'No existe POA activo', concat( 'POA ', `po`.`periodo_poa` ) ) AS `periodo_poa_msj`,
	`c`.`tipo_institucion` AS `tipo_institucion`,
	`u`.`profile` AS `profile`,
	`u`.`correo` AS `email`,
	ifnull( concat( '(', group_concat( `ud`.`departamento` SEPARATOR '),(' ), ')' ), '' ) AS `secundarios`,
	`u`.`intersectorial` AS `intersectorial`,
	`u`.`interinstitucional` AS `interinstitucional`,
	ifnull(
		concat( '[', `u`.`departamento`, ',', group_concat( `ud`.`departamento` SEPARATOR ',' ), ']' ),
		concat( '[', `u`.`departamento`, ']' ) 
	) AS `departamentos_y_secundarios`,
	`c`.`confirm` AS `confirm`,
	`pb`.`nombre` AS `nombre`,
	`pb`.`descripcion` AS `descripcion`,
	`pb`.`pacc` AS `pacc`,
	`pb`.`riesgo` AS `riesgo`,
	`pb`.`privada` AS `privada`,
	`pb`.`multianual` AS `multianual`,
	`pb`.`cantidad_usuario_departamental` AS `cantidad_usuario_departamental`,
	`pb`.`cantidad_usuario_planificacion` AS `cantidad_usuario_planificacion`,
	`pb`.`cantidad_admin` AS `cantidad_admin`,
	`pb`.`multiinstitucion` AS `multiinstitucion`,
	`pb`.`creacion_poa_flexibles` AS `creacion_poa_flexibles`,
	`pb`.`evidencias_flexibles` AS `evidencias_flexibles`,
	`pb`.`precio` AS `precio`,
	`pb`.`custom` AS `custom`,
	`c`.`moneda` AS `moneda`,
	ifnull( `m`.`nombre`, 'DOP' ) AS `monedacode`,
	ifnull( `m`.`formato`, ',.' ) AS `monedaformat`,
	ifnull( `m`.`codigo`, '$' ) AS `monedasimbol`,
	u.cargo as cargo ,
	c.maneja_notificaciones
FROM
	(
		(
			(
				(
					(
						(
							(
								(
									(
										(
											(
												( `usuario` `u` LEFT JOIN `compania` `c` ON ( ( `c`.`id` = `u`.`compania` ) ) )
												LEFT JOIN `institucion` `i` ON ( ( `i`.`id` = `u`.`institucion` ) ) 
											)
											LEFT JOIN `usuario` `u1` ON ( ( ( `u1`.`esadmin` = 1 ) AND ( `u1`.`compania` = `u`.`compania` ) ) ) 
										)
										LEFT JOIN `pei` `pe` ON ( ( ifnull( `pe`.`institucion`, `pe`.`compania` ) = ifnull( `u`.`institucion`, `u`.`compania` ) ) ) 
									)
									LEFT JOIN `marco_estrategico` `me` ON ( ( `me`.`pei` = `pe`.`id` ) ) 
								)
								LEFT JOIN `poa` `po` ON ( ( `po`.`pei` = `pe`.`id` ) ) 
							)
							LEFT JOIN `poa_monitoreo` `pm` ON ( ( `pm`.`id` = `po`.`monitoreo` ) ) 
						)
						LEFT JOIN `usuario_departamento` `ud` ON ( ( `ud`.`usuario` = `u`.`id` ) ) 
					)
					LEFT JOIN `presupuesto_aprobado` `pay` ON ( ( `pay`.`departamento` = `u`.`departamento` ) ) 
				)
				LEFT JOIN `departamento` `d` ON ( ( `d`.`id` = `u`.`departamento` ) ) 
			)
			LEFT JOIN `plan_base` `pb` ON ( ( `pb`.`id` = `c`.`plan` ) ) 
		)
		LEFT JOIN `moneda` `m` ON ( ( `m`.`id` = `c`.`moneda` ) ) 
	) 
WHERE
	(
		isnull( `c`.`deleted_at` ) 
		AND isnull( `u`.`deleted_at` ) 
		AND isnull( `pe`.`deleted_at` ) 
		AND isnull( `po`.`deleted_at` ) 
		AND isnull( `pm`.`deleted_at` ) 
	) 
GROUP BY
	`u`.`id`,
	`u`.`id`,
	concat( `u`.`nombre`, ' ', `u`.`apellido` ),
	`u`.`correo`,
	`u1`.`correo`,
	`u`.`password`,
	`c`.`id`,
	`c`.`nombre`,
	`pe`.`id`,
	`pe`.`nombre`,
	`pe`.`periodo_desde`,
	`pe`.`periodo_hasta`,
	ifnull( `pe`.`activo`, 0 ),
	`pe`.`estatus`,
	`po`.`id`,
	`po`.`nombre`,
	`po`.`periodo_poa`,
	ifnull( `po`.`activo`, 0 ),
	`u`.`id`,
	`po`.`estado`,
	`pm`.`nombre_mostrar`,
	`pm`.`cantidad`,
	`me`.`id`,
	`u`.`departamento`,
	`u`.`active`,
	`u`.`viceministerio`,
	`u`.`direccion_general`,
	`u`.`direccion_area`,
IF
	( ( `pe`.`activo` <> 1 ), 'No existe PEI activo', concat( 'PEI ', `pe`.`periodo_desde`, ' - ', `pe`.`periodo_hasta` ) ),
IF
	( ( `po`.`activo` <> 1 ), 'No existe POA activo', concat( 'POA ', `po`.`periodo_poa` ) ),
	`c`.`tipo_institucion`,
	`u`.`profile`,
	`u`.`correo` 
ORDER BY
	`po`.`activo` DESC ;

DROP TABLE `syplansqa2coraasan`.`aaa_poa - indicadores productos`;

DROP TABLE `syplansqa2coraasan`.`builder`;

DROP TABLE `syplansqa2coraasan`.`temporalgasby`;

DROP TABLE `syplansqa2coraasan`.`zzcacho_drp_producto_x_indicador`;

SET FOREIGN_KEY_CHECKS=1;